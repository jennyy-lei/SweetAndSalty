#!/usr/bin/env python3
"""
Test psycopg with CockroachDB.
"""

import time
import random
import logging
from argparse import ArgumentParser, RawTextHelpFormatter

import psycopg2
from psycopg2.errors import SerializationFailure


# queries for ingredients table
def get_iname(conn, iid):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT iname FROM db.ingredients WHERE iid=%d" % iid
        )
        rows = cur.fetchall()
        conn.commit()
        if rows:
            return rows[0][0]
        return None


def get_iid(conn, iname):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT iid FROM db.ingredients WHERE iname=\'%s\'" % iname
        )
        rows = cur.fetchall()
        conn.commit()
        if rows:
            return rows[0][0]
        return None


def get_iids_by_inames(conn, inames):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT iid FROM db.ingredients WHERE iname in (%s)" % ",".join(["\'%s\'" % x for x in inames])
        )
        rows = cur.fetchall()
        conn.commit()
        if rows:
            return [int(row[0]) for row in rows]
        return None


def get_inames_by_iids(conn, iids):
    inames = []
    for iid in iids:
        iname = get_iname(conn, iid)
        if iname != None:
            inames.append(iname)
    return inames


# queries for recipes table
def get_recipe_info(conn, rid):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT * FROM db.recipes WHERE rid=%d" % rid
        )
        rows = cur.fetchall()
        conn.commit()
        if rows:
            return list(rows[0])
        return None


def get_bulk_recipe_info(conn, rids):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT * FROM db.recipes WHERE rid in (%s)" % ",".join([str(x) for x in rids])
        )
        rows = cur.fetchall()
        conn.commit()
        if rows:
            return [list(x) for x in rows]
        return []


def get_rid_by_rname(conn, rname):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT rid FROM db.recipes WHERE rname=\'%s\'" % rname
        )
        rows = cur.fetchall()
        conn.commit()
        if rows:
            return rows[0][0]
        return None


def get_ingredients_with_recipe(conn, rid):
    info = get_recipe_info(conn, rid)
    return [int(x) for x in info[-1].split(";")]


def get_bulk_recipe_ingredients(conn, rids):
    info = get_bulk_recipe_info(conn, rids)
    recipe_ingredients = []
    for recipe_info in info:
        recipe_ingredients.append([int(x) for x in recipe_info[-1].split(";")])
    return recipe_ingredients


# queries for ingredients_to_recipes table
def get_recipes_with_ingredient(conn, iid):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT rid FROM db.ingredients_to_recipes WHERE iid=%d" % iid
        )
        rows = cur.fetchall()
        conn.commit()
        return [x[0] for x in rows]


# higher-level database endpoints
def get_viable_recipes_rids(conn, iids):
    if not iids:
        return []       # this only occurs if no valid ingredients are listed

    valid_recipes = set(get_recipes_with_ingredient(conn, iids[0]))
    for i in range(1, len(iids)):
        recipes = get_recipes_with_ingredient(conn, iids[i])
        valid_recipes = valid_recipes.intersection(recipes)
    return list(valid_recipes)


def get_completed_recipes_info(conn, ingredients):
    iids = get_iids_by_inames(conn, ingredients)
    viable_rids = get_viable_recipes_rids(conn, iids)
    info = get_bulk_recipe_info(conn, viable_rids)

    completed_recipes = []
    for recipe_info in info:
        req_iids = [int(x) for x in recipe_info[-1].split(';')]
        complete = 1
        for iid in req_iids:
            if iid not in iids:
                complete = 0
        if complete:
            completed_recipes.append(recipe_info)

    return completed_recipes


def get_recommended_ingredients(conn, ingredients, shuffle_counter):
    iids = get_iids_by_inames(conn, ingredients)
    viable_rids = get_viable_recipes_rids(conn, iids)
    viable_iids = {}
    recipe_ingr = get_bulk_recipe_ingredients(conn, viable_rids[:min(20, len(viable_rids))])
    for ingr_list in recipe_ingr:
        for iid in ingr_list:
            if iid in viable_iids:
                viable_iids[iid] += 1
            else:
                viable_iids[iid] = 1
    taken_iids = get_iids_by_inames(conn, ingredients)
    available_iids = []
    for iid in viable_iids:
        if iid not in taken_iids:
            available_iids.append([viable_iids[iid], iid])
    available_iids = sorted(available_iids, reverse=True)
    if not available_iids:
        return []

    ind = 5 * shuffle_counter

    recommended_iids = []
    for i in range(ind, ind+5):
        recommended_iids.append(available_iids[i%len(available_iids)][1])
    recommended_iids = list(set(recommended_iids))

    return get_inames_by_iids(conn, recommended_iids)


def run_transaction(conn, op, max_retries=3):
    """
    Execute the operation *op(conn)* retrying serialization failure.

    If the database returns an error asking to retry the transaction, retry it
    *max_retries* times before giving up (and propagate it).
    """
    # leaving this block the transaction will commit or rollback
    # (if leaving with an exception)
    with conn:
        for retry in range(1, max_retries + 1):
            try:
                print(op(conn))

                # If we reach this point, we were able to commit, so we break
                # from the retry loop.
                return

            except SerializationFailure as e:
                # This is a retry error, so we roll back the current
                # transaction and sleep for a bit before retrying. The
                # sleep time increases for each failed transaction.
                logging.debug("got error: %s", e)
                conn.rollback()
                logging.debug("EXECUTE SERIALIZATION_FAILURE BRANCH")
                sleep_ms = (2 ** retry) * 0.1 * (random.random() + 0.5)
                logging.debug("Sleeping %s seconds", sleep_ms)
                time.sleep(sleep_ms)

            except psycopg2.Error as e:
                logging.debug("got error: %s", e)
                logging.debug("EXECUTE NON-SERIALIZATION_FAILURE BRANCH")
                raise e

        raise ValueError(f"Transaction did not succeed after {max_retries} retries")


def test_retry_loop(conn):
    """
    Cause a seralization error in the connection.

    This function can be used to test retry logic.
    """
    with conn.cursor() as cur:
        # The first statement in a transaction can be retried transparently on
        # the server, so we need to add a dummy statement so that our
        # force_retry() statement isn't the first one.
        cur.execute("SELECT now()")
        cur.execute("SELECT crdb_internal.force_retry('1s'::INTERVAL)")
    logging.debug("test_retry_loop(): status message: %s", cur.statusmessage)


conn_string = "postgres://testuser:testpassword@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/sweet-and-salty-3616.bank?sslmode=verify-full&sslrootcert=../../users/micha/appdata/roaming/.postgresql/root.crt"

def main():
    conn = psycopg2.connect(conn_string)

    test_ingr = ["milk", "flour"]
    test_ingr2 = ["broccoli", "bacon", "green onions", "raisins", "sugar", "mayonnaise", "vinegar"]
    print (get_completed_recipes_info(conn, test_ingr2))
    print (get_recommended_ingredients(conn, test_ingr, 0))

    '''
    try:
        run_transaction(conn, lambda conn: get_recommended_ingredients(conn, test_ingr, 0))

        # The function below is used to test the transaction retry logic.  It
        # can be deleted from production code.
        # run_transaction(conn, test_retry_loop)
    except ValueError as ve:
        # Below, we print the error and continue on so this example is easy to
        # run (and run, and run...).  In real code you should handle this error
        # and any others thrown by the database interaction.
        logging.debug("run_transaction(conn, op) failed: %s", ve)
        pass
    '''

    # Close communication with the database.
    conn.close()


if __name__ == "__main__":
    main()
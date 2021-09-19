from flask import Flask, jsonify, request
from db import conn_string, get_completed_recipes_info, get_recommended_ingredients
from flask_cors import CORS
import json
import psycopg2

app = Flask(__name__)
CORS(app)
selected_ingredient = []
matched_recipes = {"size":0,"data":[]}
time_lower = 0
time_upper = 1000
shuffle_counter = 0
skip = False
conn = psycopg2.connect(conn_string)
# querries and updates the local matched recipes with some selected ingredient given. used to optimize search given some input ingre
def q_receipes(selected_in):
    global matched_recipes
    global time_lower
    global time_upper
    completed_recipes_info = get_completed_recipes_info(conn, selected_in,time_lower,time_upper)
    matched_recipes["size"] += len(completed_recipes_info)
    for recipe_info in completed_recipes_info:
        recipe_data = {
            "name": recipe_info[1],
            "time": recipe_info[2],
            "link": recipe_info[3]
        }
        matched_recipes["data"].append(recipe_data)

@app.route('/init', methods=['POST'])
def post_initial_params():
    # set the vars to global
    global selected_ingredient
    global matched_recipes
    global time_lower
    global time_upper
    global skip
    time_lower = 0
    time_upper = 1000
    # hard reset if page is refreshed
    selected_ingredient = []
    matched_recipes = {"size":0,"data":[]}
    # get req json
    req_json = request.get_json()
    #load json to object
    data = json.loads(str(req_json).replace("'",'"'))
    raw_text = data["data"]

    time_choice = data["time"]
    if time_choice == 1:
        time_upper = 10
    elif time_choice == 2:
        time_lower = 10
        time_upper = 30
    elif time_choice == 3:
        time_lower = 30
        time_upper = 60
    raw_text = raw_text.lower()

    # only modify if not [""]
    if len(raw_text) != 0:
        tmp_ingredient = raw_text.split(',') #remove spaces, lowercase force and split via comma
        for ingre in tmp_ingredient: # strip outer spaces
            ingre = ingre.strip()
            selected_ingredient.append(ingre)
            q_receipes(list(set(selected_ingredient)))
    selected_ingredient = list(set(selected_ingredient))
    matched_recipes["data"].sort(key=lambda x: x["time"], reverse=True)
    skip = True
    return "", 204

@app.route('/ingre', methods=['GET'])
def get_recom_ingre():
    global shuffle_counter
    global selected_ingredient

    # query db for 
    recom_ingr = get_recommended_ingredients(conn, selected_ingredient, shuffle_counter)
    
    data = {"data": recom_ingr}

    # prepare for next time call with shuffle++
    shuffle_counter +=1
    resp = app.make_response(jsonify(data))
    return resp

@app.route('/ingre', methods=['PUT'])
def put_selected_ingre():
    global selected_ingredient
    data = json.loads(str(request.get_json()).replace("'",'"'))
    new_selected_ingre = data["ingre"]
    selected_ingredient.append(new_selected_ingre)
    return "", 204
    # routes as stated in doc

@app.route('/recipe', methods=['GET'])
def get_matched_recipes():
    global matched_recipes
    global shuffle_counter
    global skip
    global time_lower
    global time_upper
    # get matched recipes from db with the fields and params as indicated below
    if not skip:
        completed_recipes_info = get_completed_recipes_info(conn, selected_ingredient,time_lower,time_upper)
        matched_recipes["size"] += len(completed_recipes_info)
        for recipe_info in completed_recipes_info:
            recipe_data = {
                "name": recipe_info[1],
                "time": recipe_info[2],
                "link": recipe_info[3]
            }
            matched_recipes["data"].append(recipe_data)
        matched_recipes["data"].sort(key=lambda x: x["time"], reverse=True)
    skip = False
    shuffle_counter = 0;
    return jsonify(matched_recipes)
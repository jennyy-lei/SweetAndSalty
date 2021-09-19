from flask import Flask, jsonify, request
from db import conn_string, get_completed_recipes_info, get_recommended_ingredients
from flask_cors import CORS
import json
import psycopg2

app = Flask(__name__)
CORS(app)
selected_ingredient = []
matched_recipes = {"size":0,"data":[]}
time_choice = None
shuffle_counter = 0
conn = psycopg2.connect(conn_string)

@app.route('/init', methods=['POST'])
def post_initial_params():
    # set the vars to global
    global selected_ingredient
    global time_choice
    global matched_recipes
    # hard reset if page is refreshed
    selected_ingredient = []
    time_choice = None
    matched_recipes = {"size":0,"data":[]}
    # get req json
    req_json = request.get_json()
    print(req_json)
    #load json to object
    data = json.loads(str(req_json).replace("'",'"'))
    raw_text = data["data"]
    time_choice = data["time"]
    raw_text = raw_text.replace(" ","").lower()

    # only modify if not [""]
    if len(raw_text) != 0:
        selected_ingredient = raw_text.split(',') #remove spaces, lowercase force and split via comma
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
    print("selected are:")
    print(selected_ingredient)
    global shuffle_counter
    # get matched recipes from db with the fields and params as indicated below
    completed_recipes_info = get_completed_recipes_info(conn, selected_ingredient)

    matched_recipes["size"] += len(completed_recipes_info)
    for recipe_info in completed_recipes_info:
        recipe_data = {
            "name": recipe_info[1],
            "time": recipe_info[2],
            "link": recipe_info[3]
        }
        matched_recipes["data"].append(recipe_data)

    shuffle_counter = 0;
    print("matched size is:")
    print(matched_recipes["size"])
    return jsonify(matched_recipes)
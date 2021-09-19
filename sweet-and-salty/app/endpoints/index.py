from flask import Flask, jsonify, request
from .models import Recipes,Ingredients,IngredientsToReceipes
from flask_cors import CORS
import json
import psycopg2 # TODO: whatever we use for db access

app = Flask(__name__)
CORS(app)

selected_ingredient = []
time_choice = None
matched_recipes = [] # contain the recipes we already matched and sent to front, filter these
shuffle_counter = 0

@app.route('/init', methods=['POST'])
def post_initial_params():
    # set the vars to global
    global selected_ingredient
    global time_choice
    
    # get req json
    req_json = request.get_json()

    #load json to object
    data = json.loads(str(req_json).replace("'",'"'))
    raw_text = data["data"]
    time_choice = data["time"]
    raw_text = raw_text.replace(" ","").lower()

    # only modify if not [""]
    if len(raw_text) != 0:
        global selected_ingredient
        selected_ingredient = raw_text.split(',') #remove spaces, lowercase force and split via comma
    return "", 204

@app.route('/ingre', methods=['GET'])
def get_recom_ingre():
    global shuffle_counter
    #TODO: querry the database for 5 ingredients that matches our criteria
    sample_data = {
        "ingre1": "Banana",
        "ingre2": "Egg",
        "ingre3": "flour",
        "ingre4": "chicken",
        "ingre5": "water"
    }
    # prepare for next time call with shuffle++
    shuffle_counter +=1
    resp = app.make_response(jsonify(sample_data))
    return resp

@app.route('/ingre', methods=['PUT'])
def put_selected_ingre():
    global selected_ingredient
    data = json.loads(request.get_json())
    new_selected_ingre = data["ingre"]
    selected_ingredient.append(new_selected_ingre)

    return "", 204
    # routes as stated in doc

@app.route('/recipe', methods=['GET'])
def get_matched_recipes():
    global shuffle_counter
    #TODO: get matched recipes from db with the fields and params as indicated below
    sample_data = {
        "size":2,
        "recipe1":{
            "name": "apple pie",
            "time": 2,
            "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fkristineskitchenblog.com%2Fmy-favorite-apple-pie%2F&psig=AOvVaw2-CnwxCjxgI_SGveFaWdSy&ust=1632082511546000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLjHxqSrifMCFQAAAAAdAAAAABAD"
        },
        "recipe2":{
            "name": "banana pie",
            "time": 1,
            "image": "https://cdn.sallysbakingaddiction.com/wp-content/uploads/2016/07/Banana-Cream-Pie-8.jpg"
        },
    }
    shuffle_counter = 0;
    return jsonify(sample_data)
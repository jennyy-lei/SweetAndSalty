from flask import Flask, jsonify, request
from models import Recipes,Ingredients,IngredientsToReceipes
import json

app = Flask(__name__)

selected_ingredient = []
time_choice = None
matched_recipes = [] # contain the recipes we already matched and sent to front, filter these
@app.route('/init', methods=['POST'])
def post_initial_params():
    data = json.loads(request.get_json())
    raw_text = data["data"]
    time_choice = data["time"]
    selected_ingredient = raw_text.replace(" ","").toLowerCase().split(',') #remove spaces, lowercase force and split via comma
    return "", 204

@app.route('/ingre', methods=['GET'])
def get_recom_ingre():
    #TODO: querry the database for 5 ingredients that matches our criteria
    sample_data = {
        "ingre1": "Banana",
        "ingre2": "Egg",
        "ingre3": "flour",
        "ingre4": "chicken",
        "ingre5": "water"
    }
    return jsonify(sample_data)

@app.route('/ingre', methods=['PUT'])
def put_selected_ingre():
    data = json.loads(request.get_json())
    new_selected_ingre = data["ingre"]
    selected_ingredient.append(new_selected_ingre)

    return "", 204
    # routes as stated in doc

@app.route('/recipe', methods=['GET'])
def get_matched_recipes():
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
    return jsonify(sample_data)
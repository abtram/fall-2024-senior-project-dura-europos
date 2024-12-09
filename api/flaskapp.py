from flask import Flask, request, make_response
from flask_cors import CORS
from database.db_operations import get_rows_with_loc, get_rows_with_type
import json

app = Flask(__name__)
CORS(app)

@app.route('/location-query')
def location_query():
    # Get argument
    location = request.args.get('location')
    location_label_dict = {
        "temple-of-atargatis": "temple of atargatis",
        "synagogue": "synagogue",
        "christian-building": "Christian Building",
        "palmyrene-gate": "Palmyrene Gate",
        "mithraeum": "mithraeum",
        "citadel-palace": "Citadel",
        "dolicheneum": "Dolicheneum",
        "dux-palace": "Dux Palace",
        "lysias-residence": "House of Lysias",
        "house-of-scribes": "House of Scribes",
        "temple-of-azzanathkona": "Temple of Azzanathkona"
    }
    location_label = location_label_dict[location]

    # Query database
    result = get_rows_with_loc(location_label)
    print(f"Database result for {location_label}: {result}")

    # Return response as json
    result_json = json.dumps(result)
    print(result_json)
    response = make_response(result_json)
    return response

@app.route('/type-query')
def type_query():
    # Get argument
    location = request.args.get('location')
    obj_type = request.args.get('type')
    if obj_type == "catapult-ball":
        obj_type = "Catapult Ball"
    elif obj_type == "relief-sculpture":
        obj_type = "relief sculpture"

    # Query database
    result = get_rows_with_type(location, obj_type)
    print(result)

    # Return response as json
    result_json = json.dumps(result)
    print(result_json)
    response = make_response(result_json)
    return response

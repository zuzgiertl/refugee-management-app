from flask import Blueprint, render_template, make_response, redirect
from config import realm_api_key
import requests
import json

mod = Blueprint('page_routes', __name__)


@mod.route('/')
def home():
    return render_template("index.html")


@mod.route('/build')
def build():
    # TODO: check if Google auth token is valid
    return render_template("build.html")


@mod.route('/case/<id>')
def find_case(id):

    url = "https://data.mongodb-api.com/app/data-luhnp/endpoint/data/beta/action/find"

    payload = json.dumps({
        "dataSource": "crisis-management-app",
        "database": "cma",
        "collection": "cases",
        "filter": {
            "caseNumber": id
        }
    })
    headers = {
        'api-key': realm_api_key,
        'Content-Type': 'application/json'
    }
    # send the request to realm server
    response = requests.request("POST", url, headers=headers, data=payload)
    #single case find one
    single_case = response.json()["documents"][0]

    return render_template("case.html", case=single_case)

from flask import Blueprint, render_template, make_response, redirect
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

@mod.route('/<id>')
def findCase (id):

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
    'api-key': '62V3AOyla74WEYTUd8gjaLOx5v2BRg7DjrueGNtQLiJXjFDib7BJHtRaR5RPmjRC',
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    case = response.json()["documents"][0]

    return render_template("caseModal.html", case=case)

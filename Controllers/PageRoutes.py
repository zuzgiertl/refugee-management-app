from flask import Blueprint, render_template, make_response, redirect


mod = Blueprint('page_routes', __name__)


@mod.route('/')
def home():
    return render_template("index.html")


@mod.route('/build')
def build():
    # TODO: check if Google auth token is valid
    return render_template("build.html")

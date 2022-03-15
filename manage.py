from flask import Flask
from config import session_key, app_config
from Controllers import PageRoutes, CaseRoutes
import os


app = Flask(__name__)

# app settings
app.secret_key = session_key
app.static_folder = app_config['ROOT_PATH'] + '/Views/static'
app.template_folder = app_config['ROOT_PATH'].split('Controllers')[0] + '/Views/templates'
app.config['JSON_SORT_KEYS'] = False


# blueprints init
blueprints = [
    PageRoutes.mod,
    CaseRoutes.mod
]
for bp in blueprints:
    app.register_blueprint(bp)


if __name__ == '__main__':
    app.run(host="localhost", port=5010, debug=True)

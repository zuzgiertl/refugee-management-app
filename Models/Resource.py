from Utilities.Database import conn
from bson import json_util
from flask import jsonify

class Resource:
    def __init__(self):
        self.collection = conn['csa']['resources']

    def search(self, query):
        pipe = [
            {
                '$search': {
                    'index': 'resources',
                    'text': {
                        'query': query,
                        'path': {'wildcard':'*'}                    }
                }
            }
        ]
        docs = list(self.collection.aggregate(pipe))
        json_result = json_util.dumps({'docs': docs}, json_options=json_util.RELAXED_JSON_OPTIONS)
        return jsonify(json_result)



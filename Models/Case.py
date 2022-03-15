from Utilities.Database import conn
from flask import jsonify

class Case:
    def __init__(self):
        self.collection = conn['cma']['cases']

    def search(self, query):
        pipe = [
            {
                '$search': {
                    'text': {
                        'query': query,
                        'path': {'wildcard':'*'}
                    }
                }
            },
            {
                '$limit':15
            }
        ]
        return list(self.collection.aggregate(pipe))

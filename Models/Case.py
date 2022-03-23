from Utilities.Database import conn
from flask import jsonify

class Case:
    def __init__(self):
        self.collection = conn['csa']['cases']

    def search(self, query):
        pipe = [
            {
                '$search': {
                    'index': 'cases',
                    'text': {
                        'query': query,
                        'path': {'wildcard':'*'}
                        # 'synonyms': 'cmaSynonyms'
                    }
                }
            },
            {
                '$limit':15
            }
        ]
        return list(self.collection.aggregate(pipe))

from Models.Resource import Resource
from flask import Blueprint, request, jsonify
from bson import json_util
import json



mod = Blueprint('resource_routes', __name__)

# endpoint
@mod.route('/api/resource/search', methods=['GET'])
def search():
    query = request.args.get('query', default=None, type=str)
    results = Resource().search(query=query)
    return results
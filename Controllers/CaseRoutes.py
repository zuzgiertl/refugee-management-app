from Models.Case import Case
from flask import Blueprint, request, jsonify
from bson import json_util
import json


mod = Blueprint('case_routes', __name__)

# endpoint
@mod.route('/api/case/search', methods=['GET'])
def search():
    query = request.args.get('query', default=None, type=str)
    results = Case().search(query=query)
    print(results)
    # f = []
    # for r in results['docs']:
    #     r['_id']['$oid'] = str(r['_id']['$oid'])
    #     r.append(f)
    json_data = json.loads(json_util.dumps(results, json_options=json_util.RELAXED_JSON_OPTIONS))
    return jsonify(json_data)

from Models.Case import Case
from flask import Blueprint, request


mod = Blueprint('case_routes', __name__)

# endpoint
@mod.route('/api/case/search', methods=['GET'])
def search():
    query = request.args.get('query', default=None, type=str)
    results = Case().search(query=query)
    return results

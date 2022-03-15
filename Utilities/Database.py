import pymongo
from config import mongo_uri
import ssl

conn = pymongo.MongoClient(mongo_uri)

import pymongo
from backend.settings import MONGO_DATABASE_URL, MONGO_DATABASE_NAME
client = pymongo.MongoClient(MONGO_DATABASE_URL)
db = client[MONGO_DATABASE_NAME]
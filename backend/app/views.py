import random
import pymongo
from .models import *
from .utils import ServerResponseHandler, REQUEST_TYPE
from datetime import datetime, date
from bson.objectid import ObjectId

# POST #
def GetAllPost(data):
    date_format= "%Y-%m-%d"
    try:
        dLower = datetime.strptime(data['dateFrom'], date_format).date()
    except:
        dLower = datetime.min
    try:
        dUpper = datetime.strptime(data['dateTo'], date_format).date()
    except:
        dUpper = datetime.max
        
    sortPresetIndex = int(data['sortPresetIndex'])
    sortField = ""
    sortDirection = pymongo.ASCENDING
    find = {}
    dLower = datetime.combine(dLower, datetime.min.time())
    dUpper = datetime.combine(dUpper, datetime.min.time())

    if (data['selTopic'] == "ALL"):
        find = {"dateCreation" : {"$gte": dLower, "$lte": dUpper}}
    else :
        find = {
            "dateCreation" : {"$gte": dLower, "$lte": dUpper},
            "topic" : data['selTopic']
        }

    if(sortPresetIndex == 1):
        sortField = "likes"
        sortDirection = pymongo.DESCENDING
    elif(sortPresetIndex == 2):
        sortField = "topic"
        sortDirection = pymongo.ASCENDING
    elif(sortPresetIndex == 3):
        sortField = "dateCreation"
        sortDirection = pymongo.DESCENDING
    elif(sortPresetIndex == 4):
        sortField = "dateCreation"
        sortDirection = pymongo.ASCENDING
    else:
        print("sortPresetIndex " + sortPresetIndex + " NOT FOUND")
    
    return list(qry_col_post.find(find).sort(sortField, sortDirection))

def getAllPost(request):
    return ServerResponseHandler(request, REQUEST_TYPE.POST, GetAllPost)

def PutPost(data):
    qry_col_post.insert_one({
      "title" : data['title'],
      "dateCreation" : datetime.now(),
      "summary": data['summary'],
      "text" : data['text'],
      "publisher": data['publisher'],
      "topic": data['topic'],
      "likes": random.randint(1000, 10000)
    })
    return None

def putPost(request):
    return ServerResponseHandler(request, REQUEST_TYPE.POST, PutPost)

def DeletePost(data):
    qry_col_post.delete_one({
        "_id" : ObjectId(data['id']['$oid'])
    })

def deletePost(request):
    return ServerResponseHandler(request, REQUEST_TYPE.POST, DeletePost)

# USER #
def PutUser(data):
    url = 'https://img.freepik.com/vektoren-premium/mann-avatar-profilbild-vektor-illustration_268834-538.jpg'
    if(data['url'] != None):
        url = data['url']
    qry_col_user.insert_one({
      "name" : data['name'],
      "surname" : data['surname'],
      "username": data['username'],
      "imageProfileURL" : url,
      "email": data['email'],
      "password": data['password']
    })
    return None

def putUser(request):
    return ServerResponseHandler(request, REQUEST_TYPE.POST, PutUser)

def Login(data):
    user = qry_col_user.find({
      "username": data['username'],
      "password": data['password']
    })
    users = list(user)
    print("users=",users)
    if(len(users) != 1): return None
    else: return users[0]

def login(request):
    return ServerResponseHandler(request, REQUEST_TYPE.POST, Login)

# TOPIC #
def GetAllTopic(data):
    return list(["Math","Science","Data Science","Machine Learning","Coding","C#","C++","JS"])

def getAllTopic(request):
    return ServerResponseHandler(request, REQUEST_TYPE.GET, GetAllTopic)

# EXTERNAL CALL #
def GetTextFromChatGPT(data):
    return "TEXT-FROM-CHAT-GPT"

def getTextFromChatGPT(request):
    return ServerResponseHandler(request, REQUEST_TYPE.GET, GetTextFromChatGPT)
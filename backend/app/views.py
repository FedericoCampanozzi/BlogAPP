from .models import *
from .utils import ServerResponseHandler, REQUEST_TYPE
from datetime import datetime

# POST #
def GetAllPost(data):
    return list(qry_col_post.find())

def getAllPost(request):
    return ServerResponseHandler(request, REQUEST_TYPE.GET, GetAllPost)

def PutPost(data):
    qry_col_post.insert_one({
      "title" : data['title'],
      "dateCreation" : datetime.now(),
      "summary": data['summary'],
      "text" : data['text'],
      "publisher": data['publisher'],
      "topic": data['topic'],
      "likes": 0
    })
    return None

def putPost(request):
    return ServerResponseHandler(request, REQUEST_TYPE.POST, PutPost)

# USER #
def PutUser(data):
    url = 'https://img.freepik.com/vektoren-premium/mann-avatar-profilbild-vektor-illustration_268834-538.jpg'
    if(data['url'] != None):
        url = data['url']
    print("url=",url)
    qry_col_user.insert_one({
      "name" : data['name'],
      "surname" : data['surname'],
      "dateOfBirthday" : data['dateOfBirthday'],
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
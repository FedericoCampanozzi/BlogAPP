from .models import *
from .utils import ServerResponseHandler, REQUEST_TYPE

# POST #
def f_getAll(data):
    return list(qry_col_post.find())

def getAll(request):
    return ServerResponseHandler(request, REQUEST_TYPE.GET, f_getAll)

# USER #
def f_putUser(data):
    url = 'https://img.freepik.com/vektoren-premium/mann-avatar-profilbild-vektor-illustration_268834-538.jpg';
    if(data['url'] != None):
        url = data['url']
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
    return ServerResponseHandler(request, REQUEST_TYPE.POST, f_putUser)

def f_login(data):
    user = qry_col_user.find({
      "username": data['username'],
      "password": data['password']
    })
    users = list(user)
    print("users=",users)
    if(len(users) != 1): return None
    else: return users[0]

def login(request):
    return ServerResponseHandler(request, REQUEST_TYPE.POST, f_login)
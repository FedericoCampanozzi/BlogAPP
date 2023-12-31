from django.http import HttpResponse
from .models import *
from .utils import ServerResponseHandler, REQUEST_TYPE

# POST #
def f_getAll(request):
    return list(qry_col_post.find())

def getAll(request):
    return ServerResponseHandler(request, REQUEST_TYPE.GET, f_getAll)

# USER #
def f_putUser(request):
    qry_col_user.insert_one({
      "name" : request.data.name,
      "surname" : request.data.surname,
      "dateOfBirthday" : request.data.dateOfBirthday,
      "username": request.data.username,
      "email": request.data.email,
      "password": hash(request.data.password)
    })
    return None

def putUser(request):
    return ServerResponseHandler(request, REQUEST_TYPE.PUT, f_putUser)

def f_login(request):
    print("hash=", hash(request.POST.get('password', None)))
    user = qry_col_user.find_one({
      "username": request.POST.get('username', None),
      "password": hash(request.POST.get('password', None))
    })
    print("user=", user)
    return user

def login(request):
    return ServerResponseHandler(request, REQUEST_TYPE.POST, f_login)
import random
from .models import *
from .utils import ServerResponseHandler, REQUEST_TYPE
from datetime import datetime, timedelta
from django.db.models import Q, F

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
    sortDirection = ""
    filter = None
    dLower = datetime.combine(dLower, datetime.min.time()) + timedelta(days=-1)
    dUpper = datetime.combine(dUpper, datetime.min.time()) + timedelta(days=1)
    
    if (data['selTopic'] == "ALL"):
        filter = Q(dateCreation__gte=dLower) & Q(dateCreation__lte=dUpper)
    else :
        filter = Q(dateCreation__gte=dLower) & Q(dateCreation__lte=dUpper) & Q(topic__name=data['selTopic'])

    if(sortPresetIndex == 1):
        sortField = "likes"
        sortDirection = "-"
    elif(sortPresetIndex == 2):
        sortField = "topic"
        sortDirection = ""
    elif(sortPresetIndex == 3):
        sortField = "dateCreation"
        sortDirection = "-"
    elif(sortPresetIndex == 4):
        sortField = "dateCreation"
        sortDirection = ""
    else:
        print("sortPresetIndex " + sortPresetIndex + " NOT FOUND")

    return list(
            Post.objects
                .filter(filter)
                .order_by(sortDirection + sortField)
                .select_related('publisher','topic')
                .values(
                    'id',
                    'title', 
                    'dateCreation', 
                    'summary',
                    'likes',
                    'topic__name',
                    'text',
                    pid=F('publisher__id'),
                    name=F('publisher__name'),
                    surname=F('publisher__surname'),
                    imageProfileURL=F('publisher__imageProfileURL'),
                    username=F('publisher__username')
                )
        )

def getAllPost(request):
    return ServerResponseHandler(request, REQUEST_TYPE.POST, GetAllPost)

def PutPost(data):
    Post(
      title = data['title'],
      dateCreation = datetime.now(),
      summary = data['summary'],
      text = data['text'],
      publisher_id = int(data['publisher']['id']),
      topic_id = Topic.objects.filter(name=data['topic']).values()[0]['id'],
      likes = random.randint(1000, 10000)
    ).save()
    return None

def putPost(request):
    return ServerResponseHandler(request, REQUEST_TYPE.POST, PutPost)

def DeletePost(data):
    Post.objects.get(id=data['id']).delete()
    return None

def deletePost(request):
    return ServerResponseHandler(request, REQUEST_TYPE.POST, DeletePost)

# USER #
def PutUser(data):
    url = 'https://img.freepik.com/vektoren-premium/mann-avatar-profilbild-vektor-illustration_268834-538.jpg'
    if(data['url'] != None):
        url = data['url']
    User(
      name = data['name'],
      surname = data['surname'],
      username = data['username'],
      dateOfBirthday = datetime.now(),
      imageProfileURL = url,
      email = data['email'],
      password = data['password']
    ).save()
    return None

def putUser(request):
    return ServerResponseHandler(request, REQUEST_TYPE.POST, PutUser)

def Login(data):
    users = list(User.objects.filter(Q(username=data['username']) & Q(password=data['password'])).values())
    print("users=",users)
    if(len(users) != 1): return None
    else: return users[0]

def login(request):
    return ServerResponseHandler(request, REQUEST_TYPE.POST, Login)

# TOPIC #
def GetAllTopic(data):
    l = list()
    for t_name in Topic.objects.all().values():
        l.append(t_name["name"])
    return l

def getAllTopic(request):
    return ServerResponseHandler(request, REQUEST_TYPE.GET, GetAllTopic)
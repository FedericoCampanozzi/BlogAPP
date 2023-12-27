from django.shortcuts import render
from django.http import HttpResponse
from .models import *

# POST #
def getAll(request):
    return HttpResponse(qry_col_post.find())

def getPost(request):
    idPost = request.id
    return HttpResponse(qry_col_post.find_one(idPost))

def putPost(request):
    try:
        new_post = {
            "title" : request.data.title,
            "text" : request.data.text,
            "summary" : request.data.summary,
            "url_image_background" : request.data.url_image_background,
            "category" : request.data.category,
            "user_creator" : request.data.user_creator
        }
        qry_col_post.insert_one(new_post)
        return HttpResponse("Post inserted correctly")
    except:
        return HttpResponse("Post can't be inserted")
    
def updatePost(request):
    try:
        return HttpResponse("Post updated correctly")
    except:
        return HttpResponse("Post can't be updated")
    
def deletePost(request):
    try:
        return HttpResponse("Post deleted correctly")
    except:
        return HttpResponse("Post can't be deleted")

# USER #
def login(request):
    try:
        user = qry_col_user.find_one(request.data.id)
        return HttpResponse("User logged in")
    except:
        return HttpResponse("Login fail")
    
def putUser(request):
    try:
        user = qry_col_user.find_one(request.data.id)
        return HttpResponse("Post deleted correctly")
    except:
        return HttpResponse("Login fail")
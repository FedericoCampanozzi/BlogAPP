from django.shortcuts import render
from django.http import HttpResponse
from .models import *

def getAll(request):
    return HttpResponse(qry_col_post.find())

def addPost(request):
    new_post = {
        "Title" : "My First Title",
        "Author" : "David Smith",
    }
    qry_col_post.insert_one(new_post)
    return HttpResponse("Post inserted correctly")
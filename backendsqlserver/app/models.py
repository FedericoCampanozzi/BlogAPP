from django.db import models

class Topic(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    dateOfBirthday = models.DateTimeField()
    username = models.CharField(max_length=50)
    imageProfileURL = models.CharField(max_length=1000, blank=True, null=True)
    email = models.EmailField(max_length=254)
    password = models.CharField(max_length=10)

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    dateCreation = models.DateTimeField()
    summary = models.CharField(max_length=500)
    text = models.CharField(max_length=2000, blank=True, null=True)
    publisher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fk_user')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='fk_topic')
    likes = models.IntegerField()
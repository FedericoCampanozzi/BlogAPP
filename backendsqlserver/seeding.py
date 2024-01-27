import os
import django

# Imposta la variabile di ambiente DJANGO_SETTINGS_MODULE per puntare al tuo file settings.py
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backendsqlserver.settings')

# Inizializza l'ambiente Django
django.setup()

from faker import Faker
from app.models import *
import random
from datetime import datetime
from django.utils import timezone

def insertTopic(topic_name):
    topic = Topic(name=topic_name)
    topic.save()
    return topic

def insertUser(fake, allImageProfile):
    user = User(
        name = fake.first_name(),
        surname = fake.last_name(),
        dateOfBirthday = datetime.now(),
        username = fake.user_name(),
        imageProfileURL = fake.random_element(allImageProfile),
        email = fake.email(),
        password = fake.word()
    )
    user.save()
    return user

def insertPost(fake, allUser, allTopic):
    randomDatetime = datetime.combine(fake.past_date('-3650d'), datetime.min.time())

    Post(
        title = fake.sentence(nb_words=3),
        dateCreation = timezone.make_aware(randomDatetime),
        summary = fake.sentence(),
        text = fake.paragraph(),
        publisher = fake.random_element(allUser),
        topic = fake.random_element(allTopic),
        likes = random.randint(1000, 10000)
    ).save()
    return

def main():
    print(" - Seeding DB")
    
    Post.objects.all().delete()
    Topic.objects.all().delete()
    User.objects.all().delete()

    fake = Faker()
    nPosts = 100
    nUsers = 10
    allImageProfile = [
        "https://as1.ftcdn.net/v2/jpg/05/52/16/74/1000_F_552167476_hcxk1Xw1BbnXiftBnbRyPcYUiDq3BTZJ.jpg",
        "https://backcountrygallery.com/wp-content/uploads/2019/06/lion-profile-blog-300x200.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/c/c8/Horse_headshot_4400.jpg",
        "https://t4.ftcdn.net/jpg/05/64/62/97/360_F_564629713_KGS2HmCNBIvGuPDBvBvLIcP2BlaRyHRV.jpg",
        "https://t3.ftcdn.net/jpg/05/67/88/12/360_F_567881207_2nEHiJVZ8yOGuIbDfrYFjKrQZHrfcyt3.jpg"
    ]
    allTopicsName = ["Math","Science","Data Science","Machine Learning","Coding","C#","C++","JS"]
    
    print(f" - Seeding {len(allTopicsName)} topics")
    allTopic = [insertTopic(topic_name) for topic_name in allTopicsName]

    print(f" - Seeding {nUsers} users")
    allUser = [insertUser(fake, allImageProfile) for i in range(nUsers)]

    print(f" - Seeding {nPosts} posts")
    for i in range(nPosts):
        insertPost(fake, allUser, allTopic)
    
    return

if __name__ == '__main__':
    main()
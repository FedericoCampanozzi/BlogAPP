from faker import Faker
from app.models import *
import random
from datetime import datetime
from app.views import GetAllTopic

def getDateJsonObeject(date):
    formatted_date = date.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"
    jsonDate = {"$date": formatted_date}
    return jsonDate

def insertUser(fake, allImageProfile):
    user = {
        "name" : fake.first_name(),
        "surname" : fake.last_name(),
        "dateOfBirthday" : getDateJsonObeject(fake.past_datetime('-21900d')),
        "username": fake.user_name(),
        "imageProfileURL" : fake.random_element(allImageProfile),
        "email": fake.email(),
        "password": fake.word()
    }
    qry_col_user.insert_one(user)
    return user

def insertPost(fake, allUser, allTopic):
    qry_col_post.insert_one({
        "title" : fake.sentence(nb_words=4),
        "dateCreation" : getDateJsonObeject(fake.past_datetime('-3650d')),
        "summary": fake.sentence(),
        "text" : fake.paragraph(),
        "publisher": fake.random_element(allUser),
        "topic": fake.random_element(allTopic),
        "likes": random.randint(1000, 10000)
    })
    return

def main():
    print(" - Seeding DB")
    
    qry_col_post.delete_many({})
    qry_col_user.delete_many({})

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
    allTopic = GetAllTopic(None)
    print(f" - Seeding {nUsers} users")
    allUser = [insertUser(fake, allImageProfile) for i in range(nUsers)]
    print(f" - Seeding {nPosts} posts")
    allUser = [insertPost(fake, allUser, allTopic) for i in range(nPosts)]

    return

if __name__ == '__main__':
    main()
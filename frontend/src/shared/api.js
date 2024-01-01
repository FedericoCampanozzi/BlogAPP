import axios from "./axios.config";

function errorFlow(func) {
  try {
    func();
  } catch (err) {
    console.error(err);
  }
}

/* POST */
const getAllPostAPI = async (setPosts) => {
  errorFlow(async () => {
    const response = await axios.get("/api/v1/post/get-all");
    const posts = [...response.data['data']];
    setPosts(posts);
  });
};
const putPostAPI = async (
  title,
  summary,
  text,
  publisher
) => {
  errorFlow(async () => {
    await axios.post("/api/v1/post/put", {
      "title" : title,
      "summary": summary,
      "text" : text,
      "publisher": publisher
    });
  });
};

/* USER */
const loginAPI = async (username, password, setUserAuth) => {
  errorFlow(async () => {
    const response = await axios.post("/api/v1/user/login", {
      "username" : username,
      "password" : password
    });
    const user = response.data['data'];
    setUserAuth(user);
  });
};
const putUserAPI = async (
  name,
  surname,
  dateOfBirthday,
  username,
  imageProfileUrl,
  email,
  password
) => {
  errorFlow(async () => {
    await axios.post("/api/v1/user/put", {
      "name" : name,
      "surname" : surname,
      "dateOfBirthday" : dateOfBirthday,
      "username": username,
      "url": imageProfileUrl,
      "email": email,
      "password": password
    });
  });
};

/* TOPIC */
const getAllTopicAPI = async (setTopics) => {
  errorFlow(async () => {
    const response = await axios.get("/api/v1/topic/get-all");
    const topics = [...response.data['data']];
    setTopics(topics);
  });
};

export {
  getAllPostAPI,
  putPostAPI,
  loginAPI,
  putUserAPI,
  getAllTopicAPI
}
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

export {
  getAllPostAPI,
  loginAPI,
  putUserAPI
}
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
    console.log("posts=",posts);
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
    const user = response.data;
    setUserAuth(user);
  });
};
const putUserAPI = async (
  name,
  surname,
  dateOfBirthday,
  username,
  email,
  password
) => {
  errorFlow(async () => {
    await axios.put("/api/v1/user/put", {
      "name" : name,
      "surname" : surname,
      "dateOfBirthday" : dateOfBirthday,
      "username": username,
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
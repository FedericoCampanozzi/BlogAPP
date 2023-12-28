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

export {
  getAllPostAPI,
  loginAPI
}
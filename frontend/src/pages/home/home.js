import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const routeAddPost = () => {
    //navigate("/add-post");
    navigate("/login");
  };
  return (
    <>
      <div>
        <Button variant="info" onClick={() => navigate("/registration")}>
          Create New Account
        </Button>
        <Button variant="info" onClick={() => navigate("/login")}>
          Log In
        </Button>
        <h1>Home Page</h1>
        <div></div>
        <div>
          <Button variant="info" onClick={() => routeAddPost()}>
            Add Post
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;

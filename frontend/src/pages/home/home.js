import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useSharedState } from "../../shared/state-context";
import { getAllPostAPI } from '../../shared/api';
import PostCard from "./partial/post/post";

const Home = () => {
  const navigate = useNavigate();
  const { posts, setPosts, userAuth } = useSharedState();
  
  useEffect(()=>{
    getAllPostAPI(setPosts);
  }, []);

  const routeAddPost = () => {
    if (userAuth != null ) navigate("/add-post");
    else navigate("/login");
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
        <div>
          {
            posts?.map((post, index)=>{
              return (
                <div key={`p_${index}`}>
                  <PostCard post={post} isDetail={false} />
                </div>
              )
            })
          }
        </div>
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

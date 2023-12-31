import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useSharedState } from "../../shared/state-context";
import { getAllPostAPI } from "../../shared/api";
import PostCard from "./partial/post/post";
import Header from "./partial/header/header";
import PostsFilter from "./partial/filter/filter";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const { posts, setPosts, userAuth } = useSharedState();

  useEffect(() => {
    getAllPostAPI(setPosts);
  }, []);

  const routeAddPost = () => {
    if (userAuth != null) navigate("/add-post");
    else navigate("/login");
  };

  return (
    <div>
      <Header />
      <div className="posts-container">
        <div className="posts-scrollable">
          {posts?.map((post, index) => {
            return (
              <div key={`p_${index}`}>
                <PostCard post={post} isDetail={false} />
              </div>
            );
          })}
        </div>
        <Button variant="info" className="btn-add-post" onClick={() => routeAddPost()}>
          Add Post
        </Button>
      </div>
      <div className="filter-container">
        <PostsFilter />
      </div>
    </div>
  );
};

export default Home;

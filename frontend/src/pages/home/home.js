import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useSharedState } from "../../shared/state-context";
import { getAllPostAPI, getAllTopicAPI } from "../../shared/api";
import PostCard from "./partial/post/post";
import Header from "./partial/header/header";
import PostsFilter from "./partial/filter/filter";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const { posts, setPosts, userAuth, setTopics } = useSharedState();

  useEffect(() => {
    getAllPostAPI(setPosts);
    getAllTopicAPI(setTopics)
  }, [setPosts,setTopics]);

  const routeAddPost = () => {
    if (userAuth != null)
      navigate("/add-post");
    else {
      const fromAddPost = true;
      navigate("/login", {
        state: {
          fromAddPost
        }
      });
    }
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
        <Button variant="outline-dark" className="btn-add-post" onClick={() => routeAddPost()}>
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

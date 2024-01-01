import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useSharedState } from "../../shared/state-context";
import PostCardLayout from "../home/partial/post/post";

const PostDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { post } = state;
  const { posts } = useSharedState();

  let p = [...posts];
  p = p.filter((p_el) => p_el.topic === post?.topic);

  console.log("post=", post);
  console.log("posts=", p);
  return (
    <>
      <Button variant="outline-dark" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <Button variant="outline-danger" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Button variant="outline-dark" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHeart} />
      </Button>
      <PostCardLayout type={"DETAIL"} post={post} />

      <h1>Related Post</h1>

      {p?.map((post, index) => {
        return (
          <div key={`p_${index}`}>
            <PostCardLayout type={"RELATED"} post={post} />
          </div>
        );
      })}
    </>
  );
};

export default PostDetail;

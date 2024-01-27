import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useSharedState } from "../../shared/state-context";
import PostCard from "../home/partial/post/post-card";
import { Col, Container, Row } from "react-bootstrap";
import { deleteAPI } from "../../shared/api";
import './post-detail.css'

const PostDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { post } = state;
  const { posts, userAuth } = useSharedState();
  let _posts = [...posts];
  let posts_related = _posts.filter((p) => 
    (process.env.REACT_APP_DB === "MONGO" && p.topic === post?.topic && p._id.$oid !== post._id.$oid) ||
    (process.env.REACT_APP_DB === "SQL" && p.topic__name === post?.topic__name && p.id !== post.id)
  );
  let isMyPost = userAuth !== null && userAuth !== undefined && (
    (process.env.REACT_APP_DB === "MONGO" && userAuth.username === post?.publisher.username) ||
    (process.env.REACT_APP_DB === "SQL" && userAuth.id === post?.pid));
  const onClickDelete = () => {
    if(process.env.REACT_APP_DB === "MONGO")
      deleteAPI(post._id);
    else if(process.env.REACT_APP_DB === "SQL")
      deleteAPI(post.id);
    else
      console.error("process.env.REACT_APP_DB DON'T SET")
    navigate("/");
  };
  return (
    <>
      <Container>
        <Row>
          <Col sm={8}>
            <Button variant="outline-dark m-btn" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            {
              userAuth !== null && userAuth !== undefined && isMyPost ? (
                <Button variant="outline-danger m-btn" onClick={onClickDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              ):null
            }
          </Col>
          <Col>
            <h1>Related Post</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <PostCard type={"DETAIL"} post={post} />
          </Col>
          <Col>
            <div className="post-related-container">
              {posts_related?.map((post, index) => {
                return (
                  <div key={`p_${index}`}>
                    <PostCard type={"RELATED"} post={post} />
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PostDetail;

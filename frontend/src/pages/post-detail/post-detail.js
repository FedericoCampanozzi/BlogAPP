import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useSharedState } from "../../shared/state-context";
import PostCardLayout from "../home/partial/post/post";
import { Col, Container, Row } from "react-bootstrap";
import { deleteAPI } from "../../shared/api";

const PostDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { post } = state;
  const { posts, userAuth } = useSharedState();

  let _posts = [...posts];
  _posts = _posts.filter((p) => 
    p.topic === post?.topic && p._id.$oid !== post._id.$oid
  );

  const onClickDelete = () => {
    deleteAPI(post._id);
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
              userAuth !== null && userAuth !== undefined && userAuth.username === post?.publisher.username ? (
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
            <PostCardLayout type={"DETAIL"} post={post} />
          </Col>
          <Col>
            {_posts?.map((post, index) => {
              return (
                <div key={`p_${index}`}>
                  <PostCardLayout type={"RELATED"} post={post} />
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PostDetail;

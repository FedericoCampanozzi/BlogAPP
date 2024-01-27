import React from "react";
import Card from "react-bootstrap/Card";
import { getFormattedDate } from "../../../../shared/utility-function";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Row } from "react-bootstrap";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import './post-card.css';
/*
  1-POST = Post nella home page
  2-DETAIL = Post nel dettaglio nella route /post-detail
  3-RELATED = Post correlato sempre nella route /post-detail
*/
const PostCard = ({ post, type }) => {
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate("/post-detail", {
      state: {
        post,
      },
    });
  }
  return (
    <>
      <Card className="card-container">
        <Card.Body>
          <Container>
            <Row>
              {
                (type === "POST" || type === "DETAIL")?(
                  <>
                    <Col>{post?.title}</Col>
                    <Col>
                      <div
                        className="image-profile"
                        style={{
                          backgroundImage: `url("${post?.publisher?.imageProfileURL || post?.imageProfileURL}")`,
                        }}
                      ></div>
                    </Col>
                  </>
                ):(
                  <Col>{post?.title}</Col>
                )
              }
              <Col>{post?.publisher?.name || post?.name}</Col>
              <Col>{post?.publisher?.surname || post?.surname}</Col>
            </Row>
            <Row>
              <Col>
                <span className="post-data">
                  {getFormattedDate(post?.dateCreation?.$date || post?.dateCreation)}
                </span>
              </Col>
              <Col></Col>
              <Col>@{post?.topic || post?.topic__name}</Col>
            </Row>
            <Row>
              <Col>
              {
                (type === "DETAIL")?(
                  <p>
                    {post?.text}
                  </p>
                ):(
                  <p>
                    {post?.summary}
                  </p>
                )
              }
              </Col>
              <Col>
                <FontAwesomeIcon icon={faHeart} /> <span>{post?.likes}</span>
              </Col>
            </Row>
            <Row>
              <Col>
              {
                (type === "POST" || type === "RELATED")?(
                  <Button variant="outline-dark" onClick={goToDetail}>
                    Detail
                  </Button>
                ):null
              }
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default PostCard;

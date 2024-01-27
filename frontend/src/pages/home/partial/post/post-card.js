import React from "react";
import Card from "react-bootstrap/Card";
import { getFormattedDate } from "../../../../shared/utility-function";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Row } from "react-bootstrap";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
//import { Link, useNavigate } from "react-router-dom";
import "./post-card.css";
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
  };
  return (
    <>
      <Card className="card-container">
        <Card.Body>
          <Container>
            <Row>
              <Col aria-colspan={3}>
                {type === "RELATED" ? <>{post?.title}</> : <>{post?.title}</>}
              </Col>
            </Row>
            <br />
            {type === "RELATED" ? (
              <>
                <Row>
                  <Col aria-colspan={3}>
                    Posted:&nbsp;
                    <span className="post-data">
                      {getFormattedDate(
                        post?.dateCreation?.$date || post?.dateCreation
                      )}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col aria-colspan={3}>
                    Topic: {post?.topic || post?.topic__name}
                  </Col>
                </Row>
                <Row>
                  <Col aria-colspan={3}>
                    <FontAwesomeIcon icon={faHeart} /> <span>{post?.likes}</span>
                  </Col>
                </Row>
              </>
            ) : (
              <Row>
                <Col sm={6}>
                  Posted:&nbsp;
                  <span className="post-data">
                    {getFormattedDate(
                      post?.dateCreation?.$date || post?.dateCreation
                    )}
                  </span>
                </Col>
                <Col sm={3}>Topic: {post?.topic || post?.topic__name}</Col>
                <Col sm={3}>
                  <FontAwesomeIcon icon={faHeart} /> <span>{post?.likes}</span>
                </Col>
              </Row>
            )}
            <Row>
              <Col aria-colspan={3}>
                <br />
                {type === "DETAIL" ? (
                  <p>{post?.text}</p>
                ) : (
                  <p>{post?.summary}</p>
                )}
              </Col>
            </Row>
            <Row>
              {type === "POST" ? (
                <>
                  <Col>
                    <Button variant="outline-dark" onClick={goToDetail}>
                      Detail
                    </Button>
                  </Col>
                  <Col aria-colspan={2}>
                    <div
                      className="image-profile"
                      style={{
                        backgroundImage: `url("${
                          post?.publisher?.imageProfileURL ||
                          post?.imageProfileURL
                        }")`,
                      }}
                    ></div>
                    &nbsp;
                    {post?.publisher?.username || post?.username}
                  </Col>
                </>
              ) : null}
              {type === "RELATED" ? (
                <>
                  <Button variant="outline-dark" onClick={goToDetail}>
                    Detail
                  </Button>
                </>
              ) : null}
              {type === "DETAIL" ? (
                <Col aria-colspan={3}>
                  Author:&nbsp;
                  {post?.publisher?.name || post?.name}&nbsp;
                  {post?.publisher?.surname || post?.surname}
                </Col>
              ) : null}
            </Row>
            <br />
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default PostCard;

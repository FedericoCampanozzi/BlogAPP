import React from "react";
import Card from "react-bootstrap/Card";
import { getFormattedDate } from "../../../../shared/utility-function";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";

const PostCardDetail = ({ post }) => {
  return (
    <>
      <Card className="card-container">
        <Card.Body>
          <Container>
            <Row>
              <Col>{post?.title}</Col>
              <Col>
                <div
                  className="image-profile"
                  style={{
                    backgroundImage: `url("${post?.publisher.imageProfileURL}")`,
                  }}
                ></div>
              </Col>
              <Col>{post?.publisher.name}</Col>
              <Col>{post?.publisher.surname}</Col>
            </Row>
            <Row>
              <Col>
                <span className="post-data">
                  {getFormattedDate(post?.dateCreation.$date)}
                </span>
              </Col>
              <Col></Col>
              <Col>@{post?.topic}</Col>
            </Row>
            <Row>
              <Col>{post?.text}</Col>
              <Col>
                <FontAwesomeIcon icon={faHeart} /> <span>{post?.likes}</span>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default PostCardDetail;

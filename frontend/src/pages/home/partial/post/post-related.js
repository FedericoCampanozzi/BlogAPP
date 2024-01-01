import React from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import { getFormattedDate } from "../../../../shared/utility-function";

const PostCardRelated = ({post}) => {
    return (
        <>
        <Card className="card-container">
          <Card.Body>
            <Container>
              <Row>
                <Col>{post?.title}</Col>
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
                <Col>
                    {post?.text}
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </>
    )
}

export default PostCardRelated
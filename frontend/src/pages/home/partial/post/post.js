import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
const PostCard = ({ post, isDetail }) => {
  return (
    <div>
      <Button variant="info" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
    </div>
  );
};

export default PostCard;

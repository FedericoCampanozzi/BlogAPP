import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const PostCard = ({ post, isDetail }) => {
  const navigate = useNavigate();
  return (
    <div>
      {
        isDetail ? (
        <Button variant="info" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        ) : null
      }
      Title : { post.title }
    </div>
  );
};

export default PostCard;

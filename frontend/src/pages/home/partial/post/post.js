import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import Card from 'react-bootstrap/Card';
import './post.css';

const PostCard = ({ post, isDetail }) => {
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate('/post-detail',  {
      state: {
        post
      }
    });
  };

  return (
    <div>
      {
        isDetail ? (
        <Button variant="info" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        ) : null
      }
      <Card className="card-container">
      <Card.Body>
        <Card.Title>{ post.Title }</Card.Title>
        <Card.Title className="card-topic">
          <div className="image-profile"> </div>
          John Smit
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted my-subtitle">
          <span>
            22-10-2023
          </span>
          <span>
            Math
          </span>
        </Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        {
          !isDetail ?(
            <Button variant="outline-dark" onClick={goToDetail}> Detail </Button>
          ):null
        }
        <div className="post-likes">
          <FontAwesomeIcon icon={faHeart} /> 1500
        </div>
      </Card.Body>
    </Card>
    </div>
  );
};

export default PostCard;

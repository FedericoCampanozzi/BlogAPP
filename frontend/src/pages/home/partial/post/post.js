import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import { useSharedState } from "../../../../shared/state-context";
import "./post.css";

const PostCard = ({ post, isDetail }) => {
  const navigate = useNavigate();
  const { posts } = useSharedState();
  const goToDetail = () => {
    navigate("/post-detail", {
      state: {
        post,
      },
    });
  };
  const getFormattedDate = (d) => {
    return new Date(d).toISOString().split("T")[0];
  };
  return (
    <div key={post.id}>
      {isDetail ? (
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
        </>
      ) : null}
      <Card className="card-container">
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Title className="card-topic">
            <div
              className="image-profile"
              style={{backgroundImage: `url("${post.publisher.imageProfileURL}")`}}
            >
            </div>
            <div>
              <span>{post.publisher.name}</span>
              &nbsp;
              <span>{post.publisher.surname}</span>
            </div>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted my-subtitle">
            <span className="post-data">
              {getFormattedDate(post.dateCreation.$date)}
            </span>
            <span className="post-topic">@{post.topic}</span>
          </Card.Subtitle>
          <Card.Text>
            {isDetail ? <span>{post.summary}</span> : <span>{post.text}</span>}
          </Card.Text>
          {!isDetail ? (
            <Button variant="outline-dark" onClick={goToDetail}>
              Detail
            </Button>
          ) : null}
          <div className="post-likes">
            <FontAwesomeIcon icon={faHeart} /> <span>{post.likes}</span>
          </div>
        </Card.Body>
      </Card>
      {
        isDetail ? (
          <>
            <h1>Related Post</h1>
            {
              posts?.map((post, index) => {
                return (
                  <div key={`p_${index}`}>
                    <PostCard post={post} isDetail={false} />
                  </div>
                );
              })
            }
          </>
        ) : null
      }
    </div>
  );
};

export default PostCard;

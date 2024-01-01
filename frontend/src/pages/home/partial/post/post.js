import React from "react";
import "./post.css";
import PostCardDetail from "./post-detail";
import PostCardRelated from "./post-related";
import PostCard from "./post-card";

const PostCardLayout = ({ type, post }) => {
  return (
    <div>
      {type === "POST" ? <PostCard post={post} /> : null}
      {type === "DETAIL" ? <PostCardDetail post={post} /> : null}
      {type === "RELATED" ? <PostCardRelated post={post} /> : null}
    </div>
  );
};

export default PostCardLayout;

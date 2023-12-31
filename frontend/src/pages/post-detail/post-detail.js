import { useLocation } from "react-router-dom";
import PostCard from "../home/partial/post/post";
import React from "react";

const PostDetail = () => {
    const { state } = useLocation();
    const { post } = state;
    return (
        <PostCard isDetail={true} post={post} />
    )
}

export default PostDetail
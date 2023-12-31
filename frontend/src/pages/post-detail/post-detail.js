import PostCard from "../home/partial/post/post";
import React from "react";

const PostDetail = (props) => {
    console.log(props);
    const { post } = props.location.state;
    return (
        <PostCard isDetail={true} post={post} />
    )
}

export default PostDetail
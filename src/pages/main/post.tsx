import React from "react";
import {Post as IPost } from "./main";

interface Props{
    post: IPost;
}

export const Post = (props:Props)=>{
    const {post}=props;
    return <div>
        <div className="title">
            <h1>{post.title}</h1>
        </div>
        <div className="body">
            <p>{post.description}</p>

            <div className="footer">
                <p>@{post.userName}</p>
            </div>
        </div>
    </div>
}
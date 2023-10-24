import React, { useEffect, useState } from "react";
import {Post as IPost } from "./main";
import { auth,db } from "../../config/firebase";
import {addDoc,getDocs, collection,query, where, deleteDoc,doc,}from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";



interface Props{
    post: IPost;
}

interface Like {
    userId:string;
    likeId:string;
}

export const Post = (props:Props)=>{
    const {post}=props;
    const [user]= useAuthState(auth);

    const [likes, setLikes]= useState<Like[] | null> (null);
    

    const likesRef=collection(db, "likes")

    const likesDoc = query(likesRef,where("postId","==",post.id));

    const getLikes = async()=>{
        const data = await getDocs(likesDoc)
        setLikes(
            data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
          );
        
    }


    const addLike =async ()=>{
        try {
            const newDoc = await addDoc(likesRef, {
              userId: user?.uid,
              postId: post.id,
            });
            if (user) {
              setLikes((prev) =>
                prev
                  ? [...prev, { userId: user.uid, likeId: newDoc.id }]
                  : [{ userId: user.uid, likeId: newDoc.id }]
              );
            }
          } catch (err) {
            console.log(err);
          }
        };

    //which users like this post
    const hasUserLinked = likes?.find((like)=>like.userId===user?.uid)

    useEffect(()=>{
        getLikes();
    },[])

   
    return <div>
        <div className="title">
            <h1>{post.title}</h1>
        </div>
        <div className="body">
            <p>{post.description}</p>

            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={addLike}>{hasUserLinked ? <>&#128078;</> : <>&#128077;</>}</button>
                {likes && <p>Like:{likes?.length}</p>}
            </div>
        </div>
    </div>
}
import {
    addDoc,
    getDocs,
    collection,
    query,
    where,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import { useEffect, useState } from "react";
  import { useAuthState } from "react-firebase-hooks/auth";
  import { db, auth } from "../../config/firebase";
  import { Post as IPost } from "./main";
  
  interface Props {
    post: IPost;
  }
  
  interface Like {
    likeId: string;
    userId: string;
  }
  
  export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);
  
    const [likes, setLikes] = useState<Like[] | null>(null);
  
    const likesRef = collection(db, "likes");
  
    const likesDoc = query(likesRef, where("postId", "==", post.id));
  
    const getLikes = async () => {
      const data = await getDocs(likesDoc);
      setLikes(
        data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
      );
    };
    const addLike = async () => {
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
  
    const removeLike = async () => {
      try {
        const likeToDeleteQuery = query(
          likesRef,
          where("postId", "==", post.id),
          where("userId", "==", user?.uid)
        );
  
        const likeToDeleteData = await getDocs(likeToDeleteQuery);
        const likeId = likeToDeleteData.docs[0].id;
        const likeToDelete = doc(db, "likes", likeId);
        await deleteDoc(likeToDelete);
        if (user) {
          setLikes(
            (prev) => prev && prev.filter((like) => like.likeId !== likeId)
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
  
    useEffect(() => {
      getLikes();
    }, []);
  
   return (
  <div className="post">
    <div className="post-header">
      <div className="post-title">
      <h1>{post.title}</h1>
       </div>
      <div className="post-body">
      <p>{post.description}</p>
       {post.imageUrl && (
          <img src={post.imageUrl} alt="Post" style={{ maxWidth: "100%", marginTop: "1rem" }} />
        )}
    </div>  
    </div>
    
<div className="post-footer">
  <div className="like-group">
    <button className="like-button" onClick={hasUserLiked ? removeLike : addLike}>
      {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
    </button>
    {likes && <span className="like-count">Likes: {likes.length}</span>}
  </div>
  <span className="post-username">@{post.username}</span>
</div>
  </div>
);
  };
  
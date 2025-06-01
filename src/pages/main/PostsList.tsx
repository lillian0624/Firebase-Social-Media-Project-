import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Post as PostComponent } from "./post";
import { Post as IPost } from "./main";
import "./PostsList.css";

export const PostsList = () => {
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      setPosts(postsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as IPost)));
      setFetching(false);
    };
    if (user) fetchPosts();
  }, [user]);

  if (loading || fetching) return <div>Loading...</div>;
  if (!user) return <div>Please log in to see posts.</div>;

  return (
    <div className="posts-list">
      {posts.map(post => (
       <div className="post-item" key={post.id}>
        <PostComponent post={post} />
      </div>
      ))}
    </div>
  );
};
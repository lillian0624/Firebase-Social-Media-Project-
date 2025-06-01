import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post } from "./post";
import "./post.css";

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}

export const Main = () => {
    const [user, loading] = useAuthState(auth);
    const [postList, setPostList] = useState<Post[] | null>(null);
    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
    };

    useEffect(() => {
        if (user) getPosts();
    }, [user]);

    if (loading) return <div>Loading...</div>;

    if (!user) return (
        <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
            <h1>React Firebase Posts App</h1>
            <p style={{ color: "#999", fontSize: "1.2rem" }}>
                A simple and responsive React app that allows users to log in using Google Authentication, view posts, and like/unlike them. Data is fetched and stored using Firebase Firestore.
            </p>
            <ul style={{ textAlign: "left", display: "inline-block" }}>
                <li>🔐 Google login via Firebase Authentication</li>
                <li>📄 Fetch and display posts from Firestore</li>
                <li>❤️ Like and unlike posts</li>
                <li>💬 (Optional) Create new posts</li>
                <li>📱 Responsive and clean UI</li>
                <li>🔄 Real-time updates via Firestore</li>
            </ul>
            <p style={{ marginTop: "1.5rem" }}>Please log in to see posts.</p>
        </div>
    );

    return (
        <div>
            {postList?.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};
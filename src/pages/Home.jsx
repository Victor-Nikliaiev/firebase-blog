import { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config.js";

export const Home = ({ isAuth }) => {
    const postCollectionRef = collection(db, "posts");
    const [postList, setPostList] = useState([]);

    const deletePost = async id => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    };

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef);
            setPostList(
                data.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                    createdAt: new Date(doc.data().createdAt),
                }))
            );
        };
        getPosts();
    }, [deletePost]);

    return (
        <div className='homePage'>
            {!postList.length && <p>No posts yet</p>}
            {postList.map(post => {
                return (
                    <div className='post' key={post.id}>
                        <div className='postHeader'>
                            <div className='title'>
                                <h1>{post.title}</h1>
                            </div>
                            <div className='deletePost'>
                                {isAuth &&
                                    post.author.id === auth.currentUser.uid && (
                                        <button
                                            onClick={() => deletePost(post.id)}
                                        >
                                            &#128465;
                                        </button>
                                    )}
                            </div>
                        </div>
                        <div className='postTextContainer'>{post.postText}</div>
                        <h3>
                            @{post.author.name} (
                            {post.createdAt.toLocaleDateString()} -
                            {post.createdAt.toLocaleTimeString()})
                        </h3>
                    </div>
                );
            })}
        </div>
    );
};

import { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config.js";
import { MdDelete } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";

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
                data.docs
                    .map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                        createdAt: new Date(doc.data().createdAt),
                    }))
                    .sort((a, b) => b.createdAt - a.createdAt)
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
                                <h2>{post.title}</h2>
                            </div>
                            <div className='deletePost'>
                                {isAuth &&
                                    post.author.id === auth.currentUser.uid && (
                                        <button
                                            className='deletePost'
                                            onClick={() => deletePost(post.id)}
                                        >
                                            <MdDelete />
                                        </button>
                                    )}
                            </div>
                        </div>
                        <div className='postContent'>
                            <div className='postTextContainer'>
                                {post.postText}
                            </div>
                            <h4>
                                <FaRegUser /> {post.author.name}
                            </h4>
                            <span>
                                <CiCalendarDate />
                                {post.createdAt.toLocaleDateString()}{" "}
                                <IoMdTime />
                                {post.createdAt.toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

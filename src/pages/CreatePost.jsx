import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config.js";
import { useNavigate } from "react-router-dom";

export const CreatePost = ({ isAuth }) => {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const postCollectionRef = collection(db, "posts");
    const navigate = useNavigate();
    const [imageLink, setImageLink] = useState(null);

    const createPost = async () => {
        let post = {
            title,
            postText,
            imageLink,
            author: {
                name: auth.currentUser.displayName || auth.currentUser.email,
                id: auth.currentUser.uid,
            },
            createdAt: Date.now(),
        };

        if (imageLink) {
            post.imageLink = imageLink;
        }

        await addDoc(postCollectionRef, post);
        navigate("/");
    };

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, []);

    return (
        <div className='createPostPage'>
            <div className='cpContainer'>
                <h1>Create a post</h1>
                <div className='inputGp'>
                    <label>Title:</label>
                    <input
                        placeholder='Title...'
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className='inputGp'>
                    <label>Post:</label>
                    <textarea
                        placeholder='Post...'
                        onChange={e => setPostText(e.target.value)}
                    />
                </div>
                <div className='inputGp'>
                    <label>Img url:</label>
                    <input
                        placeholder='Image URL...'
                        onChange={e => setImageLink(e.target.value)}
                    />
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    );
};

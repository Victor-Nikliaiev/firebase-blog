import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config.js";
import { useNavigate } from "react-router-dom";

export const Login = ({ setIsAuth }) => {
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(result => {
            localStorage.setItem("isAuth", true);
            localStorage.setItem("userName", result.user.displayName);
            setIsAuth(true);
            navigate("/");
        });
    };

    return (
        <div className='loginPage'>
            <p>Sign in with Google</p>
            <button
                className='login-with-google-btn'
                onClick={signInWithGoogle}
            >
                Sign in with Google
            </button>
        </div>
    );
};

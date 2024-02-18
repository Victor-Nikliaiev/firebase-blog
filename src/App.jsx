import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { CreatePost } from "./pages/CreatePost.jsx";
import { Login } from "./pages/Login.jsx";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config.js";
import { GrLogout, GrLogin } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";

function App() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = "/login";
        });
    };

    return (
        <Router>
            <nav>
                <Link to='/'>
                    <IoHomeOutline /> Home
                </Link>
                {!isAuth ? (
                    <Link to='/login'>
                        <GrLogin /> Login
                    </Link>
                ) : (
                    <>
                        <Link to='/createpost'>
                            <LuPencilLine /> Create post
                        </Link>
                        <p onClick={signUserOut} className='logout'>
                            <GrLogout onClick={signUserOut} /> Logout
                        </p>
                    </>
                )}
                {isAuth && (
                    <p>
                        <span className='welcomeUser'>
                            Hello, {localStorage.getItem("userName")}
                        </span>
                    </p>
                )}
            </nav>

            <Routes>
                <Route path='/' element={<Home isAuth={isAuth} />} />
                <Route
                    path='/createpost'
                    element={<CreatePost isAuth={isAuth} />}
                />
                <Route
                    path='/login'
                    element={<Login setIsAuth={setIsAuth} />}
                />
            </Routes>
        </Router>
    );
}

export default App;

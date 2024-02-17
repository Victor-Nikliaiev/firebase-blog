import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { CreatePost } from "./pages/CreatePost.jsx";
import { Login } from "./pages/Login.jsx";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config.js";

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
                <Link to='/'>Home</Link>
                {!isAuth ? (
                    <Link to='/login'>Login</Link>
                ) : (
                    <>
                        <Link to='/createpost'>CreatePost</Link>

                        <button onClick={signUserOut}>Logout</button>
                    </>
                )}
                {isAuth && (
                    <p>
                        <em>Hello, {localStorage.getItem("userName")}</em>
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

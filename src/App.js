import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Detail from "./pages/Detail";
import Createblog from "./pages/Createblog";
import About from "./pages/About";
import Notfound from "./pages/Notfound";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { auth } from "./firebase/Config";
import { signOut } from "firebase/auth";
import "./media.css";
import Tagblog from "./components/Tagblog";
import Scrolltop from "./components/Scrolltop";
import CategoryBlog from "./pages/Categoryblog";
import Blogs from "./pages/Blogs";
const App = () => {
  const [active, setactive] = useState("home");
  const [user, setuser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setuser(authuser);
      } else {
        setuser(null);
      }
    });
  }, []);
  const handlesignout = (e) => {
    e.preventDefault();
    signOut(auth);
    setuser(null);
    setactive("login");
    navigate("/login");
  };
  return (
    <div>
      <Header
        setactive={setactive}
        active={active}
        user={user}
        handlesignout={handlesignout}
      />
      <Scrolltop/>
      <ToastContainer position="top-right" autoClose={5000} />

      <Routes>
        <Route
          path="/"
          element={<Home setactive={setactive} user={user} active={active} />}
        />
        <Route
          path="/search"
          element={<Home setactive={setactive} user={user} />}
        />
         <Route
          path="/blogs"
          element={<Blogs setactive={setactive} user={user} />}
        />
        <Route path="/detail/:id" element={<Detail setactive={setactive} user={user}/>} />
        <Route
          path="/create"
          element={
            user?.uid ? <Createblog user={user} /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/update/:id"
          element={
            user?.uid ? (
              <Createblog user={user} setactive={setactive} />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route path="/tag/:tag" element={<Tagblog />} />
        <Route
          path="/tag/:tag/detail/:id"
          element={<Detail setactive={setactive} active={active} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/category/:category" element={<CategoryBlog />} />
        <Route
          path="/login"
          element={<Login setactive={setactive} active={active} />}
        />
        <Route
          path="/register"
          element={<Register setactive={setactive} active={active} />}
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;

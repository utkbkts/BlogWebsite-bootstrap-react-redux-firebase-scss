import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/Config";
import { toast } from "react-toastify";

const initialstate = {
  email: "",
  password: "",
};

const Login = ({ active, setactive }) => {
  const [state, setstate] = useState(initialstate);
  const { email, password } = state;
  const navigate=useNavigate()
  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleauth = async (e) => {
    e.preventDefault();

    if ((email, password)) {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setactive("home");
      navigate("/")
    } else {
      return toast.error("All fields are mandatory to fill");
    }
  };
  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">
            <h1>Login in</h1>
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form action="" className="row gap-4" onSubmit={handleauth}>
              <div className="col-12">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="col-12 mt-4 d-flex justify-content-center">
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="text-center justify-content-center mt-2 pt-2">
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Don't have an account?{" "}
                <Link to={"/register"} className="text-primary">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

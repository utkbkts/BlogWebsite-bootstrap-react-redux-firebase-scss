import React from "react";
import { Link } from "react-router-dom";

const Header = ({ active, setactive, user, handlesignout }) => {
  const userID = user?.uid;

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light" >
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <nav className="navbar navbar-toggleable-md navbar-light">
            <button
              className="navbar-toggler mt-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle Navigation"
              href="#navbarSupportedContent"
              role="button" 
            >
              <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav gap-3 me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    to={"/"}
                    style={{ textDecoration: "none" }}
                    onClick={() => setactive("home")}
                    className={`nav-link ${active === "home" ? "active" : ""}`}
                    aria-current="page"
                    href="#home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/blogs"}
                    style={{ textDecoration: "none" }}
                    onClick={() => setactive("blogs")}
                    className={`nav-link ${active === "blogs" ? "active" : ""}`}
                    aria-current="page"
                    href="#blogs"
                  >
                    Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/about"}
                    style={{ textDecoration: "none" }}
                    onClick={() => setactive("about")}
                    className={`nav-link ${active === "about" ? "active" : ""}`}
                    aria-current="page"
                    href="#home"
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/create"}
                    style={{ textDecoration: "none" }}
                    onClick={() => setactive("create")}
                    className={`nav-link ${
                      active === "create" ? "active" : ""
                    }`}
                    aria-current="page"
                    href="#home"
                  >
                    Create
                  </Link>
                </li>
              </ul>
              <div className="row g-3">
                {userID ? (
                  <>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <img
                        src={user?.photoURL}
                        alt=""
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                      />
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <p style={{ marginBottom: "0" }}>{user?.displayName}</p>
                        <li
                          className="nav-item nav-link p-1"
                          onClick={handlesignout}
                        >
                          Logout
                        </li>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <Link
                          to={"/register"}
                          style={{ textDecoration: "none" }}
                          onClick={() => setactive("register")}
                          className={`nav-link ${
                            active === "register" ? "active" : ""
                          }`}
                          aria-current="page"
                          href="#home"
                        >
                          Register
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to={"/login"}
                          style={{ textDecoration: "none" }}
                          onClick={() => setactive("login")}
                          className={`nav-link ${
                            active === "login" ? "active" : ""
                          }`}
                          aria-current="page"
                          href="#home"
                        >
                          Login
                        </Link>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;

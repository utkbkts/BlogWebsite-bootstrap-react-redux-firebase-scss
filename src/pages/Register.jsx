import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, storage } from "../firebase/Config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const initialstate = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  passwordconfirm: "",
};

const Register = ({ setactive }) => {
  const navigate = useNavigate();
  const [state, setstate] = useState(initialstate);
  const { email, password, firstname, lastname, passwordconfirm } = state;
  const [showside, setshowside] = useState(false);
  const [showside1, setshowside1] = useState(false);
  const [files, setfiles] = useState(null);

  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setfiles(file);
  };
  const handleauth = async (e) => {
    e.preventDefault();

    if (password !== passwordconfirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (
      firstname &&
      lastname &&
      email &&
      password &&
      passwordconfirm &&
      files
    ) {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, `user-profiles/${user.uid}/${files.name}`);
      await uploadBytesResumable(storageRef, files);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(user, {
        displayName: `${firstname} ${lastname}`,
        photoURL: downloadURL,  // Set the photoURL
      });
      setactive("home");
      navigate("/");
    } else {
      return toast.error("All fields are mandatory to fill");
    }
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">
            <h1>Sign Up</h1>
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form action="" className="row gap-4" onSubmit={handleauth}>
              <div className="row">
                <div className="col-6 py-3">
                  <div className="form-group">
                    <label>Firstname</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstname"
                      value={firstname}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="col-6 py-3">
                  <div className="form-group">
                    <label>Lastname</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>
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
                <div className="form-group show-password">
                  <label>Password</label>
                  <input
                    type={`${showside1 ? "text" : "password"}`}
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => handleChange(e)}
                  />
                  <i
                    className={`fa-regular eyes ${
                      showside1 ? "fa-eye" : "fa-eye-slash"
                    }`}
                    onClick={() => setshowside1(!showside1)}
                  ></i>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group show-password">
                  <label>Confirm Password</label>
                  <input
                    type={`${showside ? "text" : "password"}`}
                    className="form-control"
                    name="passwordconfirm"
                    value={passwordconfirm}
                    onChange={(e) => handleChange(e)}
                  />
                  <i
                    className={`fa-regular eyes ${
                      showside ? "fa-eye" : "fa-eye-slash"
                    }`}
                    onClick={() => setshowside(!showside)}
                  ></i>
                </div>
              </div>
              <div className="col-12 d-flex align-items-center gap-2">
                <div className="form-group show-password">
                  <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                    Select photo
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    className="form-control"
                    onChange={handleFileChange} // Update this line to call handleFileChange
                    style={{ display: "none" }}
                  />
                </div>
                {files && (
                  <div className="mt-3">
                    <img
                      src={URL.createObjectURL(files)} // Display the uploaded image
                      alt="Preview"
                      style={{ width: "100px", height: "100px",borderRadius:"100%" }}
                    />
                  </div>
                )}
              </div>
              <div className="col-12 mt-4 d-flex justify-content-center">
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
            <div className="text-center justify-content-center mt-2 pt-2">
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Do you have an account ?{" "}
                <Link to={"/login"} className="text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

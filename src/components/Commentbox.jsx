import React from "react";
import { useNavigate } from "react-router-dom";

const Commentbox = ({ userId, usercomment, setusercomment, handlecomment }) => {
  const navigate = useNavigate();
  return (
    <>
      <form className="row blog-form">
        <div className="col-12 py-3">
          <textarea
            rows={"4"}
            value={usercomment}
            onChange={(e) => setusercomment(e.target.value)}
            className="form-control description"
          />
        </div>
      </form>
      {!userId ? <>
      <h5>Please login or Create an account to past comment</h5>
      <button className="btn btn-success" onClick={()=>navigate("/login")}>Login</button>
      </> : <div>
      <button className="btn btn-primary" type="submit" onClick={handlecomment}>Post Comment</button>
      </div>}
    </>
  );
};

export default Commentbox;

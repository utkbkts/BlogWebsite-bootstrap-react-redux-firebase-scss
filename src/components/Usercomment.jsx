import React from "react";
import FontAwesome from "react-fontawesome";

const Usercomment = ({ user,id, name, body, createdAt, msg, handledelete }) => {
  const handleDeleteClick = () => {
    handledelete(id);
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="comments-list">
            <div className="media">
              {msg ? (
                <h4>{msg}</h4>
              ) : (
                <>
                  <div className="media-left">
                    <img
                      src={user?.photoURL}
                      style={{ width: "100px", height: "100px", borderRadius: "100%" }}
                      alt=""
                    />
                  </div>
                  <div className="media-boy">
                    <h3 className="text-start media-heading">
                      {name} <small>{createdAt.toDate().toDateString()}</small>
                    </h3>
                    <p className="text-start">{body}</p>
                  </div>
                  <>
                    {" "}
                    <FontAwesome
                      onClick={handleDeleteClick} 
                      name="trash"
                      style={{ margin: "15px", cursor: "pointer" }}
                      size="lg"
                    />
                  </>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercomment;

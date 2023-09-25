import React, { useEffect, useState } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../utility/İndex";
import moment from "moment/moment";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/Config";

const Blogsection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  timestamps,
  author,
  userId,
  user,
  handledelete,
}) => {
  const [comment, setcomment] = useState([]);
  const [likes, setlikes] = useState([]);

  const totallikecomment = async () => {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const blogData = docSnap.data();
      setcomment(blogData.comment ? blogData.comment : []);
      setlikes(blogData.likes ? blogData.likes : []);
    } else {
      console.log("No such document!");
    }
  };
  
  useEffect(() => {
    totallikecomment();
  }, []);
  return (
    <div>
      <div className="text-start py-2 mb-4">
        <div className="row pb-4" key={id}>
          <div className="col-md-5">
            <div className="">
              <div className="">
                <img
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  src={imgUrl}
                  alt={title}
                />
                <div className="d-flex justify-content-center align-items-center">
                  <i className="bi bi-hand-thumbs-up m-2" />
                  <span>{likes.length}</span>
                  <i className="bi bi-chat-left m-2" />
                 <span> {comment.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="text-start d-flex flex-column gap-3">
              <p className="category" style={{ fontSize: "15px" }}>
                Category: {category}
              </p>
              <span className="title py-2 fw-bold">Title: {title}</span>
              <span className="meta-info">
                <p className="author fw-bold">Created: {author}</p>
                {/* <p>Date: {timestamps.toDate().toDateString()}</p> */}
                <p>Date : {moment(timestamps.toDate()).format("L")} </p>
              </span>
            </div>
            <div className="text-muted">
              Description: {excerpt(description, 120)}
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center w-100">
            <Link to={`detail/${id}`}>
              <button className="btn btn-outline-dark">Read More</button>
            </Link>
            {user && user.uid === userId && (
              <>
                {" "}
                <FontAwesome
                  onClick={() => handledelete(id)}
                  name="trash"
                  style={{ margin: "15px", cursor: "pointer" }}
                  size="lg"
                />
                <Link to={`/update/${id}`}>
                  <FontAwesome
                    name="edit"
                    style={{ cursor: "pointer" }}
                    size="lg"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogsection;

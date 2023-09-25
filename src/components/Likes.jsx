import { Tooltip } from "bootstrap";
import React, { useEffect } from "react";

const Likes = ({ handlelike, likes, userId }) => {
  useEffect(() => {
    let tooltiptriggerlist = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="toolt"]')
    );
    let tootiplist = tooltiptriggerlist.map(function (tooltiptriggerel) {
      return new Tooltip(tooltiptriggerel);
    });
  }, []);
  const Likestatus = () => {
    if (likes?.length > 0) {
      return likes.find((id) => id === userId) ? ( // kullanıcının daha önce beğenip beğenmediniğine bakılır
        <>
          <i className="bi bi-hand-thumbs-up-fill" />
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      ) : (
        <>
          <i className="bi bi-hand-thumbs-up" />
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <i className="bi bi-hand-thumbs-up" />
        Like
      </>
    );
  };
  return (
    <>
      <span
        style={{ float: "right", cursor: "pointer", marginTop: "-7px" }}
        onClick={!userId ? null : handlelike}
      >
        {!userId ? (
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="toolt"
            data-bs-placement="top"
            title="please login to like post"
          >
            <Likestatus />
          </button>
        ) : (
          <button type="button" className="btn btn-primary">
            <Likestatus />
          </button>
        )}
      </span>
    </>
  );
};

export default Likes;

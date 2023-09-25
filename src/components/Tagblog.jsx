import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/Config";
import Blogsection from "./Blogsection";
import Spinner from "./Spinner";

const Tagblog = () => {
  const [loading, setloading] = useState(false);
  const [tags, settags] = useState([]);
  const { tag } = useParams();

  const gettagblogs = async () => {
    setloading(true);
    const blogref = collection(db, "blogs");
    const tagblogget = query(blogref, where("tags", "array-contains", tag));
    const docsnapshot = await getDocs(tagblogget);
    let tagblogs = [];
    docsnapshot.forEach((doc) => {
      tagblogs.push({ id: doc.id, ...doc.data() });
    });
    settags(tagblogs);
    setloading(false);
  };
  useEffect(() => {
    gettagblogs();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="container">
      <div className="row">
        <h2 className="blog-heading text-start py-2 mb-4">
          Tag: <strong>{tag.toLocaleLowerCase()}</strong>
        </h2>
        {tags?.map((tag) => (
          <div className="col-md-6" key={tag.id}>
            <Blogsection key={tag.id} {...tag} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tagblog;

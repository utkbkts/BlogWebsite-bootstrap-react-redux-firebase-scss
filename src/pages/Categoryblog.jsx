import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/Config";
import Blogsection from "../components/Blogsection";
import Spinner from "../components/Spinner";

const CategoryBlog = () => {
  const [loading, setloading] = useState(false);
  const [categoryblogs, setcategoryblogs] = useState([]);
  const { category } = useParams();

  const getcategoryblog = async () => {
    setloading(true);
    const blogref = collection(db, "blogs");
    const tagblogget = query(blogref, where("category", "==", category));
    const docsnapshot = await getDocs(tagblogget);
    let categoryblogs = [];
    docsnapshot.forEach((doc) => {
      categoryblogs.push({ id: doc.id, ...doc.data() });
    });
    setcategoryblogs(categoryblogs);
    setloading(false);
  };
  useEffect(() => {
    getcategoryblog();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="container">
      <div className="row">
        <h2 className="blog-heading text-start py-2 mb-4">
          Category: <strong>{category.toLocaleLowerCase()}</strong>
        </h2>
        {categoryblogs?.map((cat) => (
          <div className="col-md-6" key={cat.id}>
            <Blogsection key={cat.id} {...cat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBlog;

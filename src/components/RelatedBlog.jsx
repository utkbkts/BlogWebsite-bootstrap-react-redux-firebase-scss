import React from "react";
import Card from "./Card";
import Blogsection from "./Blogsection";

const RelatedBlog = ({ blogs, id }) => {
  return (
    <div>
      <div className="blog-heading text-start pt-3 py-2">Related Blogs</div>
      <div className="col-md-12 text-left justify-content-center">
        <div className="row gx-5">
          {blogs.length === 1 && (
            <h5 className="text-center">
              Related Blogs not with the current blog
            </h5>
          )}
          {blogs
            ?.filter((blog) => blog.id !== id)
            .map((item) => (
            <>
              <Card {...item} />
            </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedBlog;

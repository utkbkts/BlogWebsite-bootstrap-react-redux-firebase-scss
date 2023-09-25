import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Category = ({ categoryCount }) => {
  return (
    <div className="">
      <div className="text-start py-2 mb-4">Category</div>
      <div className="">
        <ul>
          {categoryCount?.map((item, index) => (
            <li key={index}>
              <Link
                style={{ textDecoration: "none", float: "left", color: "#777" }}
                to={`/category/${item.category}`}
              >
                {item.category} <span>({item.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;

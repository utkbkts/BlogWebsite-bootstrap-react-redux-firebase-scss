import React from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ search, handlechange }) => {
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <h2 className="text-start py-2 mb-1 border-bottom border-black">Search</h2>
      <form action="" className="form-inline" onSubmit={handlesubmit}>
        <div className="col-12 py-3">
          <input
            type="text"
            name=""
            className="form-control"
            value={search}
            onChange={handlechange}
          />
        </div>
        <button className="btn btn-secondary search-btn">
          <i className="fa fa-search"></i>
        </button>
      </form>
    </>
  );
};

export default Search;

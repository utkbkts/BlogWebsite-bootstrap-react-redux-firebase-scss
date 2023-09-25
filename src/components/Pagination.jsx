import React from "react";

const Pagination = ({ currentPage, handlePageChange, noOfPages }) => {
  return (
    <div>
      <div className="row mx-0">
        <div className="col-12 text-center pb-4 pt-4 d-flex align-items-center justify-content-center gap-4">
          <button
            className="btn-mange"
            disabled={currentPage === 1}
            onClick={() => handlePageChange("Prev")}
          >
            <i className="fa fa-long-arrow-left"></i>&nbsp;
          </button>
          <span className="btn-pagging">{currentPage}</span>
          <button
            className="btn-mange"
            disabled={currentPage === noOfPages}
            onClick={() => handlePageChange("Next")}
          >
            <i id="arrowright" className="fa fa-long-arrow-right"></i>&nbsp;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

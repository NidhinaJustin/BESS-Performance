import React from "react";

const Pagination = ({ postsPerPage, length, currentPage, handlePagination }) => {
  const paginationNumbers = [];
  const totalPages = Math.ceil(length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"
        }`}
      >
        Previous
      </button>

      {paginationNumbers.map((pageNumber) => (
        <button
          onClick={() => handlePagination(pageNumber)}
          key={pageNumber}
          className={`px-4 py-2 border rounded ${
            currentPage === pageNumber
              ? "bg-black text-white"
              : "hover:bg-gray-200"
          }`}
          disabled={currentPage === pageNumber}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-200"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

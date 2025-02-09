import React from "react";

const MoviesSearchPagination = ({ setSearchQuery, setPageSize, totalPages, pageSize }) => {
  const handleNext = () => {
    if (pageSize < totalPages) {
      setPageSize(pageSize + 1);
    }
  };

  const handlePrev = () => {
    if (pageSize > 1) {
      setPageSize(pageSize - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6">
      <input
        type="text"
        placeholder="Rechercher un film..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:w-1/2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
      />
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrev}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Précédent
        </button>
        <span>Page {pageSize} de {totalPages}</span>
        <button
          onClick={handleNext}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default MoviesSearchPagination;

import React from "react";

const MoviesSearchPagination = ({ setSearchQuery, setPageSize }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6">
      <input
        type="text"
        placeholder="Rechercher un film..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:w-1/2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
      />
      <select
        onChange={(e) => setPageSize(e.target.value)}
        className="w-full md:w-1/4 p-3 border-2 border-gray-300 rounded-lg mt-4 md:mt-0 focus:outline-none focus:border-teal-500 transition duration-300"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
};

export default MoviesSearchPagination;

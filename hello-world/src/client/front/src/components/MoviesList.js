import React from "react";

const MoviesList = ({ movies }) => {
  if (!Array.isArray(movies)) {
    return <p className="text-center text-xl text-gray-700">Aucun film trouvé.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="transition-transform transform hover:scale-105 bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl"
        >
          <div className="relative w-full h-96 mb-4"> {/* Conteneur avec hauteur fixe */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              className="w-full h-full object-contain object-center rounded-md" // Utilisation de object-contain
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{movie.original_title}</h3>
          <p className="text-sm text-gray-600 mt-2">{movie.overview}</p>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;

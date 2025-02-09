import React, { useState, useEffect } from "react";

const Reservation = ({ token, movieId, showForm = false }) => {
  const [reservationDate, setReservationDate] = useState("");
  const [reservations, setReservations] = useState([]);

  // Récupérer les réservations de l'utilisateur
  useEffect(() => {
    if (token) {
      fetch("http://localhost:3001/reservation", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.reservations) {
            // Récupérer les détails des films associés
            const reservationsWithMovies = await Promise.all(
              data.reservations.map(async (res) => {
                const movieRes = await fetch(`http://localhost:3001/movies/${res.idMovie}`);
                const movieData = await movieRes.json();
                return { ...res, movie: movieData };
              })
            );
            setReservations(reservationsWithMovies);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [token]);

  // Fonction pour créer une réservation
  const handleReservation = () => {
    if (!token) {
      alert("🚨 Vous devez être connecté pour réserver !");
      return;
    }

    if (!reservationDate) {
      alert("Veuillez sélectionner une date !");
      return;
    }

    fetch("http://localhost:3001/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idMovie: movieId,
        reservationStart: reservationDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setReservations([...reservations, { idMovie: movieId, reservationStart: reservationDate }]);
      })
      .catch((err) => console.error(err));
  };

  // Fonction pour supprimer une réservation
  const handleDeleteReservation = (id) => {
    fetch(`http://localhost:3001/reservation/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setReservations(reservations.filter((res) => res.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {/* Formulaire de réservation */}
      {showForm && (
        <div className="mt-4">
          <input
            type="datetime-local"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setReservationDate(e.target.value)}
          />
          <button
            className={`w-full p-2 rounded ${
              token
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-400 text-gray-700"
            }`}
            onClick={handleReservation} // Ne pas désactiver le bouton, on gère le clic nous-mêmes
          >
            Réserver
          </button>
        </div>
      )}

      {/* Liste des réservations */}
      {!showForm && (
        <ul className={`grid gap-4 ${reservations.length === 1 ? "grid-cols-1" : reservations.length === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
          {reservations.length > 0 ? (
            reservations.map((res) => (
              <li key={res.id} className="p-4 border rounded shadow-md flex flex-col">
                {res.movie ? (
                  <>
                    <h3 className="text-lg font-semibold">{res.movie.original_title}</h3>
                    <p className="text-sm text-gray-600">{res.movie.overview}</p>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${res.movie.poster_path}`}
                      alt={res.movie.original_title}
                      className="w-full h-auto object-cover object-center rounded mt-2 aspect-w-16 aspect-h-9"
                    />
                  </>
                ) : (
                  <p>Chargement des détails du film...</p>
                )}
                <p className="text-sm text-gray-500">
                  Réservé pour : {new Date(res.reservationStart).toLocaleString()}
                </p>
                <button
                  className="mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  onClick={() => handleDeleteReservation(res.id)}
                >
                  Supprimer
                </button>
              </li>
            ))
          ) : (
            <p className="text-center">Aucune réservation.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Reservation;

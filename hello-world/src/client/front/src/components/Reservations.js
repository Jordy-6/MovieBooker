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
    </div>
  );
};

export default Reservation;

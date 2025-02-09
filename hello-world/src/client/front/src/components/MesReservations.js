import React from "react";
import Reservation from "./Reservations";

const MesReservations = ({ token }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Mes Réservations</h2>
      {!token &&
        <p className="text-center text-xl text-gray-700">Veuillez vous connecter pour voir vos réservations.</p>
      }
      <Reservation token={token} showForm={false} />
    </div>
  );
};

export default MesReservations;

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 shadow-lg">
      <ul className="flex justify-around items-center">
        <li>
          <Link to="/" className="text-white text-lg font-semibold hover:underline">Liste des Films</Link>
        </li>
        <li>
          <Link to="/login" className="text-white text-lg font-semibold hover:underline">Connexion</Link>
        </li>
        <li>
          <Link to="/register" className="text-white text-lg font-semibold hover:underline">Inscription</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

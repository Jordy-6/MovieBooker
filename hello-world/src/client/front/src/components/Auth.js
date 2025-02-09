import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importation de useNavigate

const Auth = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Déclaration de navigate pour la redirection

  const handleLogin = async () => {
    const response = await fetch("https://moviebooker-fmtr.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/"); // Redirection vers la liste des films après connexion
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Connexion</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Se connecter
        </button>
      </div>
    </div>
  );
};

export default Auth;

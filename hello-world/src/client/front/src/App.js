import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MoviesList = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {movies.map((movie) => (
        <Card key={movie.id} className="shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold">{movie.title}</h2>
            <p className="text-gray-600">{movie.overview}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const MoviesSearchPagination = ({ setSearchQuery, setPageSize }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <Input
        type="text"
        placeholder="Rechercher un film..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:w-1/2"
      />
      <select onChange={(e) => setPageSize(e.target.value)} className="p-2 border rounded">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="all">Tout</option>
      </select>
    </div>
  );
};

const Auth = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold">Connexion / Inscription</h2>
      <Input type="email" placeholder="Email" className="my-2 p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Mot de passe" className="my-2 p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button className="mt-4" onClick={handleLogin}>Se connecter</Button>
    </div>
  );
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    fetch(`/api/movies?search=${searchQuery}&limit=${pageSize}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then((res) => res.json())
      .then((data) => setMovies(data.movies));
  }, [searchQuery, pageSize, token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Liste des Films</h1>
      <MoviesSearchPagination setSearchQuery={setSearchQuery} setPageSize={setPageSize} />
      <MoviesList movies={movies} />
      <Auth setToken={setToken} />
    </div>
  );
};

export default App;

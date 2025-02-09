import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MoviesList from "./components/MoviesList";
import MoviesSearchPagination from "./components/MoviesSearchPagination";
import Auth from "./components/Auth";
import Register from "./components/Register";
import MesReservations from "./components/MesReservations";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    fetch(`https://moviebooker-fmtr.onrender.com/movies?search=${searchQuery}&page=${pageSize}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      });
  }, [searchQuery, pageSize, token]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Auth setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reservations" element={<MesReservations token={token} />} />
        <Route path="/" element={
          <>
            <h1 className="text-3xl font-bold text-center mb-6">Liste des Films</h1>
            <MoviesSearchPagination 
              setSearchQuery={setSearchQuery} 
              setPageSize={setPageSize} 
              totalPages={totalPages} 
              pageSize={pageSize}
            />
            <MoviesList movies={movies} token={token} />
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App;

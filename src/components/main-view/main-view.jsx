import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../singup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const similarMovies = selectedMovie
  ? movies.filter((movie) => movie.genre === selectedMovie.genre)
  : [];

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movies-my-flix-app-60bc918eee2b.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((mov) => {
          return {
            id: mov._id,
            name: mov.name,
            director: mov.director,
            year_released: mov.year_released,
            description: mov.description,
            genre: mov.genre
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center"> 
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView 
            movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)} 
            similarMovies = {similarMovies}
            setSelectedMovie={setSelectedMovie}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={4}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
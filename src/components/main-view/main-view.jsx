import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view"

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetch("https://movies-my-flix-app-60bc918eee2b.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((mov) => {
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
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movies-my-flix-app-60bc918eee2b.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, [token]);

  if (!user) {
    return <LoginView 
    onLoggedIn={(user, token) => {
      setUser(user) //Prop
      setToken(token);
    }}
    />
  }

  if (selectedMovie) {

    const similarMovies = movies.filter((movie) =>
      movie.genre === selectedMovie.genre);

    return (
      <MovieView 
      movie={selectedMovie} //prop
      onBackClick={() => setSelectedMovie(null)}
      similarMovies = {similarMovies}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
        key={movie.id}
        movie={movie} //Prop
        onMovieClick={(newSelectedMovie) => 
        setSelectedMovie(newSelectedMovie)}
       />
      ))}
      <button onClick={() => { setUser(null); setToken(null;)}}>Logout</button>
    </div>
    
  );
};
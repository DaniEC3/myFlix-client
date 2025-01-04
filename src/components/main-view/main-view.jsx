import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../singup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null)

  // useEffect(() => {
  //   fetch("https://movies-my-flix-app-60bc918eee2b.herokuapp.com/movies")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       const moviesFromApi = data.map((mov) => {
  //         return {
  //           id: mov._id,
  //           name: mov.name,
  //           director: mov.director,
  //           year_released: mov.year_released,
  //           description: mov.description,
  //           genre: mov.genre
  //         };
  //       });

  //       setMovies(moviesFromApi);
  //     });
  // }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movies-my-flix-app-60bc918eee2b.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log(movies);
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

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
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
      <button onClick={() => { setUser(null); setToken(null);}}>Logout</button>
    </div>
    
  );
};
import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
    </div>
  );
};
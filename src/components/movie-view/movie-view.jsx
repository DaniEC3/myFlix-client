import { MovieCard } from "../movie-card/movie-card";
import {useState} from "react";

export const MovieView = ({ movie, onBackClick, similarMovies, setSelectedMovie }) => {
  const formattedDate = new Date(movie.year_released).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [currentMovie, setCurrentMovie] = useState(movie);

  return (
    <div>
      <div>
        <img src={movie.imagePath} />
      </div>
      <div>
        <span>Name: </span>
        <span>{movie.name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Year Released: </span>
        <span>{formattedDate}</span>
      </div>
      <div>
        <img src={movie.imagePath} />
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>genre: </span>
        <span>{movie.genre}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
      <div>
        {similarMovies.map((movie) => (
          <MovieCard
          key={movie.id}
          movie={movie} //Prop
          onMovieClick={(newSelectedMovie) => 
          setSelectedMovie(newSelectedMovie)}
          />
            ))}
      </div>
    </div>
  );
};
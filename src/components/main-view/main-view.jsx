import React from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      name: "The Godfather",
      description: "The patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.",
      genre: "Drama",
      director: "Francis Ford Coppola",
      year_released: 1972,
      imagePath: "images/the-godfather.jpg"
    },
    {
      id: 2,
      name: "Pulp Fiction",
      description: "The lives of two hitmen, a boxer, a gangster, and his wife intertwine in four tales of crime and redemption.",
      genre: "Crime",
      director: "Quentin Tarantino",
      year_released: 1994,
      imagePath: "images/pulp-fiction.jpg"
    },
    {
      id: 3,
      name: "Spirited Away",
      description: "A young girl becomes trapped in a mysterious world and must navigate a world of spirits to save her parents.",
      genre: "Animation",
      director: "Hayao Miyazaki",
      year_released: 2001,
      imagePath: "images/spirited-away.jpg"
    },
    {
      id: 4,
      name: "Get Out",
      description: "A young African-American man uncovers disturbing secrets when he visits his white girlfriend's family estate.",
      genre: "Horror",
      director: "Jordan Peele",
      year_released: 2017,
      imagePath: "images/get-out.jpg"
    },
    {
      id: 5,
      name: "The Avengers",
      description: "Earth's mightiest heroes must come together to stop Loki and his alien army from enslaving humanity.",
      genre: "Action",
      director: "Joss Whedon",
      year_released: 2012,
      imagePath: "images/the-avengers.jpg"
    },
    {
      id: 6,
      name: "La La Land",
      description: "A jazz musician and an aspiring actress fall in love while chasing their dreams in Los Angeles.",
      genre: "Romance",
      director: "Damien Chazelle",
      year_released: 2016,
      imagePath: "images/la-la-land.jpg"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView 
      Movie={selectedMovie}
      onBackClick={() => setSelectedMovie(null)} 
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  // return (
  //   <div>
  //     {movies.map((movie) => {                               
  //       <MovieCard movie={movie}/>
  //     })}
  //   </div>
  // );

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
        key={movie.id}
        movie={movie} //Prop
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
      ))}
    </div>
  );
};
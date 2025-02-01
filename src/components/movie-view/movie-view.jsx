import { MovieCard } from "../movie-card/movie-card";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './movie-view.scss';

export const MovieView = ({ movies, onBackClick, setSelectedMovie }) => {
  const { movieId } = useParams(); // Get movieId from the URL
  const movie = movies.find((b) => b.id === decodeURIComponent(movieId));
  if (!movie) return <div>Movie not found!</div>;

  const shuffleArray = (array) => {
    let shuffledArray = [...array]; // Create a copy of the original array to avoid mutating the state
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
  };

  const formattedDate = new Date(movie.year_released).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [currentMovie, setCurrentMovie] = useState(movie);
  
  // Use useEffect to update similar movies whenever currentMovie changes
  useEffect(() => {
    setCurrentMovie(movie); // Update currentMovie whenever movieId changes
  }, [movieId]);

  // Get similar movies based on genre, excluding the current movie
  const similarMovies = currentMovie
    ? movies.filter((m) => m.genre === currentMovie.genre && m.id !== currentMovie.id)
    : [];

  const handleMovieClick = (movie) => {
    setCurrentMovie(movie); // Update the current movie when a similar movie is clicked
  };

  const shuffledSimilarMovies = shuffleArray(similarMovies);
  return (
    <div>
      <Row>
        <Col className="movie-info" md={12}>
          <div>
            <img src={movie.imagePath} alt={movie.name} />
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
            <span>Description: </span>
            <span>{movie.description}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie.genre}</span>
          </div>
          <Link to={'/'}>
            <button onClick={onBackClick} 
            className="back-button"
            style={{ cursor: "pointer" }}
            >Back</button>
          </Link>
        </Col>
        <Row>
          {/* Container with horizontal scrolling */}
          <Col md={12} className="similar-movies-container">
            <div className="similar-movies-scroll">
              {shuffledSimilarMovies.map((movie) => (
                <Col xs={12} sm={12} md={6} lg={4} key={movie.id} className="similarMovieCard">
                  <MovieCard movie={movie} setCurrentMovie={setCurrentMovie} />
                </Col>
              ))}
            </div>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

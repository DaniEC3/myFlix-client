import { MovieCard } from "../movie-card/movie-card";
import {useState} from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './movie-view.scss';

export const MovieView = ({ movies,movie, onBackClick, similarMovies, setSelectedMovie }) => {
  const formattedDate = new Date(movie.year_released).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [currentMovie, setCurrentMovie] = useState(movie);

  const movie = movies.find((b) => b.id === movieId);

  return (
    <div>
      <Row>
        <Col className="movie-info" md={12}>
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
          <Link to={'/'}>
            <button onClick={onBackClick} 
            className="back-button"
            style={{ cursor: "pointer" }}
            >Back</button>
          </Link>
        </Col>
        <Row> 
          {similarMovies.map((movie) => (
            <Col key={movie.key} className="similarMovieCard" md={3}>
            <MovieCard
            key={movie.id}
            movie={movie} //Prop
            onMovieClick={(newSelectedMovie) => 
            setSelectedMovie(newSelectedMovie)}
            />
            </Col>
            ))}
        
        </Row>
      </Row>
    </div>
  );
};
import PropTypes from "prop-types";
import { Button, Card, } from "react-bootstrap";

import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 movieCard">
      <Card.Img variant="top" src={movie.image}/>
      <Card.Body className="card-body">
        <Card.Title>{movie.name}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button className="movie-btn" onClick={() => onMovieClick(movie)} variant="link">
        {movie.name}
        </Button>
      </Card.Body>
    </Card>
    
    // <div
    //   onClick={() => {
    //     onMovieClick(movie);
    //   }}
    // >
    //   {movie.name}
    // </div>
  );
};


// set the static PropTypes property on MovieCard
//  to an object that contains special values provided
//  as utilities by prop-types.
MovieCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    year_released: PropTypes.oneOfType([PropTypes.string,
       PropTypes.instanceOf(Date)]),
    imagePath: PropTypes.string,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
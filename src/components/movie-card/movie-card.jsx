import PropTypes from "prop-types";
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.name}
    </div>
  );
};


// set the static PropTypes property on MovieCard
//  to an object that contains special values provided
//  as utilities by prop-types.
MovieCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    director: PropTypes.string,
    year_released: PropTypes.string,
    imagePath: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
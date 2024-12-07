export const MovieView = ({ movie, onBackClick }) => {
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
        <span>Director; </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Year Released: </span>
        <span>{movie.year_released}</span>
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
    </div>
  );
};
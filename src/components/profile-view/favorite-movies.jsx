import React from 'react';
import { Link } from 'react-router-dom';

function FavoriteMovies({user, movies, removeFav}) {
  
  // Filter movies to get the user's favorite movies
  console.log("Movies in FavoriteMovies:", user);
  const favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie._id)
  );
  return (
    <>
      <h2>Favorite Movies</h2>
      {favoriteMovies.length > 0 ? (
        favoriteMovies.map((movie) => (
          <div key={movie._id}>
            <img src={movie.imagePath} alt={movie.name} />
            <Link to={`/movies/${movie._id}`}>
              <h4>{movie.name}</h4>
            </Link>
            <button
              variant="secondary"
              onClick={() => removeFav(movie._id)}
            >
              Remove from list
            </button>
          </div>
        ))
      ) : (
        <p>You have no favorite movies yet.</p>
      )}
    </>
  );
}

export default FavoriteMovies;
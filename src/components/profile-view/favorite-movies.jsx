import React from 'react';
import { Link } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";

function FavoriteMovies({user, movies, setUser}) {
  const removeFav = (movieName) => {
    const token = localStorage.getItem("token"); // Retrieve token for authentication
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data
  
    if (!user) {
      console.error("User not found");
      return;
    }
  
    fetch(`https://movies-my-flix-app-60bc918eee2b.herokuapp.com/users/${user.userName}/movies/${movieName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove movie");
        }
        return response.text(); // Use text() instead of json()
      })
      .then((text) => {
        console.log("Server response:", text); // Logs "Successful" or whatever the server sends
  
        // Manually update the user object in local storage
        const updatedUser = {
          ...user,
          FavoriteMovies: user.FavoriteMovies.filter((fav) => fav !== movieName),
        };
  
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser); // Update state
      })
      .catch((error) => {
        console.error("Error removing movie:", error);
      });
    };
  
    const favoriteMovies = movies.filter((movie) =>
      user.FavoriteMovies?.includes(movie.id)
    );
    console.log(movies)
    return (
  
    <Row>
      {/* Container with horizontal scrolling  */}
      <h2 className='favoriteTitle'>Favorite Movies</h2>
      <Col md={12}  className="scrolling-movies-container ">
      {user.FavoriteMovies.length > 0 ? (
        <div className="scrolling-movies-scroll">
          {favoriteMovies.map((movie) => (
            <Col xs={12} sm={12} md={6} lg={4} key={movie.id} className="scrollingMovieCard">
               <div key={movie._id}>
               <img src={movie.imagePath} alt={movie.name} />
               <Link to={`/movies/${movie.id}`}>
                 <h4>{movie.name}</h4>
               </Link>
               <button
                variant="secondary"
                onClick={() => removeFav(movie.name)}
              >
                Remove from list
              </button>
            </div>
            
            
            
            
            {/* <MovieCard 
            movie={movie} 
            genres={genres}
            directors={directors}
            /> */}
            </Col>
            // <div key={movie._id}>
            //   <img src={movie.imagePath} alt={movie.name} />
            //   <Link to={`/movies/${movie._id}`}>
            //     <h4>{movie.name}</h4>
            //   </Link>
            //   <button
            //     variant="secondary"
            //     onClick={() => removeFav(movie._id)}
            //   >
            //     Remove from list
            //   </button>
            // </div>
          ))}
        </div>
      ) : (
        <p className='noMovieText'>You have no favorite movies yet.</p>
      )}
        {/* <div className="scrolling-movies-scroll">
          {favoriteMovies.map((movie) => (
            <Col xs={12} sm={12} md={6} lg={4} key={movie.id} className="scrollingMovieCard">
              <MovieCard 
              movie={movie} 
              setCurrentMovie={setCurrentMovie}
              genres={genres}
              directors={directors}
              />
            </Col>
          ))}
        </div> */}
      </Col>
    </Row> 

    // <>
    //   <h2 className='favoriteTitle'>Favorite Movies</h2>
    //   {favoriteMovies.length > 0 ? (
    //     favoriteMovies.map((movie) => (
    //       <div key={movie._id}>
    //         <img src={movie.imagePath} alt={movie.name} />
    //         <Link to={`/movies/${movie._id}`}>
    //           <h4>{movie.name}</h4>
    //         </Link>
    //         <button
    //           variant="secondary"
    //           onClick={() => removeFav(movie._id)}
    //         >
    //           Remove from list
    //         </button>
    //       </div>
    //     ))
    //   ) : (
    //     <p>You have no favorite movies yet.</p>
    //   )}
    // </>
  );
}

export default FavoriteMovies;
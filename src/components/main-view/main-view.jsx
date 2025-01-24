import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../singup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const similarMovies = selectedMovie
  ? movies.filter((movie) => movie.genre === selectedMovie.genre)
  : [];

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movies-my-flix-app-60bc918eee2b.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((mov) => {
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
  }, [token]);
  return (
    <BrowserRouter>
      <NavigationBar 
      user={user}
      onLoggedOut={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}
      />
      <Row className="justify-content-md-center"> 
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace/>
                ) : movies.lenght === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={5}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard 
                        movie={movie}
                        // onMovieClick={(newSelectedMovie) => {
                        // setSelectedMovie(newSelectedMovie);
                        // }}
                      />
                      </Col>  
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col md={5}>
                    <ProfileView
                    user={user}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};




  
//   return (
//     <Row className="justify-content-md-center"> 
//       {!user ? (
//         <Col md={5}>
//           <LoginView onLoggedIn={(user) => setUser(user)} />
//           <div className="or">OR</div>
//           <SignupView />
//         </Col>
//       ) : selectedMovie ? (
//         <Col md={8}>
//           <MovieView 
//             movie={selectedMovie} 
//             onBackClick={() => setSelectedMovie(null)} 
//             similarMovies = {similarMovies}
//             setSelectedMovie={setSelectedMovie}
//           />
//         </Col>
//       ) : movies.length === 0 ? (
//         <div>The list is empty! {movies}</div>
//       ) : (
//         <>
//           {movies.map((movie) => (
//             <Col className="mb-5" key={movie.id} md={4}>
//             <MovieCard
//               movie={movie}
//               onMovieClick={(newSelectedMovie) => {
//                 setSelectedMovie(newSelectedMovie);
//               }}
//             />
//             </Col>
//           ))}
//         </>
//       )}
//     </Row>
//   );
// };
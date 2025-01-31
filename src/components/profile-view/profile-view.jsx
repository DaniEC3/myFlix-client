import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";

export const ProfileView = ({user, movies}) => {
  const [error, setError] = useState(null);
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken? storedToken : null);
  
  if (!user) {
    setError("You must be logged in to view your profile.");
    return;
  }

  if (!token) {
    setError("No token.");
    return;
  }
  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} m={12}>
          <Card>
            <Card.Body>
              <UserInfo 
                user={user}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col sx={12} sm={8}>
          <Card>
            <Card.Body>
              <FavoriteMovies
              user={user}
              movies={movies}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};


export default ProfileView;
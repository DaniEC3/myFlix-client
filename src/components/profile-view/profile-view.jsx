import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import UserInfo from "./user-info";

export const ProfileView = (user, movies) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const removeFav =  (id) => {...

  // }

  // Fetch user details from the /users endpoint
  useEffect(() => {
    
    if (!user) {
      setError("You must be logged in to view your profile.");
      setLoading(false);
      return;
    }

    fetch(`"https://movies-my-flix-app-60bc918eee2b.herokuapp.com/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user details.");
        }
        return response.json();
      })
      .then((data) => {
        const foundUser = data.find((u) => u.userName === user);
        if (!foundUser) {
          setError("User not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Display loading, error, or user data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo 
              user={foundUser}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col sx={12} sm={8}>
          <Card>
            <Card.Body>
              <Favorite-Movies
              user={foundUser}
              movies={prop}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

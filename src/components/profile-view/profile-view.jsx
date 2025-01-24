import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

export const ProfileView = (user) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <Col md={8} className="mx-auto">
          <h1>Profile View</h1>
          <Form>
          <Form.Group controlId="formEmail">
              <Form.Label>First Name:</Form.Label>
              <Form.Control type="email" value={foundUser.first_Name} readOnly />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control type="email" value={foundUser.last_Name} readOnly />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" value={foundUser.userName} readOnly />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={foundUser.email} readOnly />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control type="text" value={foundUser.birthDay} readOnly />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => alert("Edit functionality not implemented yet.")}
            >
              Edit Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

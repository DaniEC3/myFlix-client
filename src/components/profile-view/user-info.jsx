import React from "react";
import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function UserInfo({user}) {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [editableUser, setEditableUser] = useState({ ...user }); // Editable user data
  
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Extract 'name' and 'value' from the input field
    setEditableUser((prevState) => ({
      ...prevState, // Keep all previous properties intact
      [name]: value, // Update only the specific field being edited
    }));
  };
  
  const handleSave = async () => {
    const url = `/users/update/${editableUser.userName}`; // Endpoint URL
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Specify the data type
        },
        body: JSON.stringify(editableUser), // Convert data to JSON
      });
  
      if (!response.ok) {
        throw new Error("Failed to update the profile");
      }
  
      const result = await response.json(); // Parse the server response
      alert("Profile updated successfully!");
      console.log("Server Response:", result);
  
      setIsEditing(false); // Switch back to view mode
    } catch (error) {
      console.error("Error updating the profile:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
     <Container>
        <Row>
          <Col md={8} className="mx-auto">
            <h1>Profile View</h1>
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="first_Name"
                  value={editableUser.first_Name}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="last_Name"
                  value={editableUser.last_Name}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={editableUser.userName}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editableUser.email}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBirthday">
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control
                  type="text"
                  name="birthDay"
                  value={editableUser.birthDay}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </Form.Group>

              {isEditing ? (
                <Button variant="success" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button variant="primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>

  );

};

export default UserInfo
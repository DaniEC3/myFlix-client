import React from "react";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({onLoggedIn}) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior
    // of the form which is to reload the entire page
    event.preventDefault();

  const data = {
    userName: username,
    password: password
  };

  //Getting the Token

  fetch("https://movies-my-flix-app-60bc918eee2b.herokuapp.com/login",
    { 
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.user) { // Locally saving the user and the key
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token); 
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  };

  return (
    // FORMS

    // With Bootstrap

    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5" 
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    // Without Bootstrap
    // 
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Username:
    //     <input type="text"
    //     value={username}
    //     onChange={(e) => setUsername(e.target.value)}
    //     required
    //     />
    //   </label>
    //   <label>
    //     Password:
    //     <input type="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     required
    //     />
    //   </label>
    //   <button type="submit">Login</button>
    // </form>  
  );
};
import React from "react";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
  
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      userName: username,
      first_Name: firstname,
      last_Name: lastname,
      password: password,
      email: email,
      birthDay: birthday
    };
  
    fetch("https://movies-my-flix-app-60bc918eee2b.herokuapp.com/users/create",
      { 
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
      }).then((response) => {
        if (response.ok) {
          alert("Signup successful");
          window.location.reload();
        } else {
          alert("Signup failed");
        }
      });
    };
    // .then((data) => {
    //   console.log("Login response: ", data);
    //   if (data.userName) { // Locally saving the user and the key
    //     localStorage.setItem("user", JSON.stringify(data.userName));
    //     localStorage.setItem("token", data.token);
    //     onLoggedIn(data.user, data.token); 
    //   } else {
    //     alert("No such user");
    //   }
    // })
    // .catch((e) => {
    //   alert("Something went wrong");
    // });



  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFirstName">
        <Form.Label>Fisrt Name:</Form.Label>
        <Form.Control
          type="text"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          required 
        />
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Last Name:</Form.Label>
        <Form.Control
          type="text"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>
      
      <Form.Group controlId="formUsernameLogin">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5" 
        />
      </Form.Group>

      <Form.Group controlId="formPasswordLogin">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    //     Email:
    //     <input
    //     type="email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     required
    //     />
    //   </label>
    //   <label>
    //     Birthday:
    //     <input
    //     type="date"
    //     value={birthday}
    //     onChange={(e) => setBirthday(e.target.value)}
    //     />
    //   </label>
    //   <button type="submit">Submit</button>
    // </form>
  );
};
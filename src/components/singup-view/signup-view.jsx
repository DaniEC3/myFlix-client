import React from "react";
import {useState} from "react";


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
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
        type="text"
        value={firstname}
        onChange={(e) => setFirstName(e.target.value)}
        required
        />
      </label>
      <label>
        Last Name:
        <input
        type="text"
        value={lastname}
        onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Username:
        <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength="5"
        />
      </label>
      <label>
        Password:
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength="8"
        />
      </label>
      <label>
        Email:
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
      </label>
      <label>
        Birthday:
        <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
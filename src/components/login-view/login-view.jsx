import React from "react";
import {useState} from "react"

export const LoginView = ({onLoggedIn}) => {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (event) => {
  // this prevents the default behavior
  // of the form which is to reload the entire page
  event.preventDefault();

const data = {
  access: username,
  secret: password
};

//Getting the Token

fetch("https://movies-my-flix-app-60bc918eee2b.herokuapp.com/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Login response: ", data);
    if (data.user) {
      onLoggedIn(data.user, data.token); 
    } else {
      alert("No such user");
    }
  })
  .catch((e) => {
    alert("Something went wrong");
  });

fetch("https://movies-my-flix-app-60bc918eee2b.herokuapp.com/login", {
  method: "POST", 
  body: JSON.stringify(data)
}).then((response) => {
  if (response.ok) {
    onLoggedIn(username);
  } else {
    alert("Login Failed")
  }
})

}


  return (
    // FORMS

    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
      </label>
      <label>
        Password:
        <input type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      </label>
      <button type="submit"/>
    </form>  
  );
};
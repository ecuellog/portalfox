import React, { useState } from 'react';
import * as firebase from "firebase/app";

function LoginView() {
  const [creds, setCreds] = useState({
    email: '',
    password:''
  });

  function onSubmit(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
    .then((res) => {
      console.log(res);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
      // ...
    });    
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={creds.email}
          onChange={e => setCreds({...creds, email: e.target.value})}
        ></input><br/>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={creds.password}
          onChange={e => setCreds({...creds, password: e.target.value})}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginView;
import React, { useState } from 'react';
import * as firebase from "firebase/app";
import { useHistory, Link } from "react-router-dom";
import BtnGoogleLogin from '../../components/BtnGoogleLogin';
import appLogo from '../../assets/images/logo_portalfox.png';

function PlatformRegisterView() {
  const [creds, setCreds] = useState({
    email: '',
    password:''
  });

  function onSubmit(e) {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password)
    .then((res) => {
      console.log(res);
      useHistory().push('/dashboard');
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
      <img src={appLogo} className="standard-app-logo p-1"></img>
      <div className="login-register-container d-flex flex-column justify-content-center">
        <h1 className="text-center mb-5">Create a Portalfox Account</h1>
        <form className="mb-0" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              value={creds.email}
              onChange={e => setCreds({...creds, email: e.target.value})}
            >
            </input>
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={creds.password}
              onChange={e => setCreds({...creds, password: e.target.value})}
            >
            </input>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Create account</button>
        </form>
        <h6 className="py-4 text-center">or</h6>
        <BtnGoogleLogin method="register"/>
        <div className="text-center my-5">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default PlatformRegisterView;
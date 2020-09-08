import React, { useState } from 'react';
import * as firebase from "firebase/app";
import { useHistory, NavLink } from "react-router-dom";
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
    <div className="d-flex flex-column justify-content-center h-100">
      <img src={appLogo} className="login-register-logo"></img>
      <div className="login-register-container">
        <h2 className="mb-5">Registrate</h2>
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
          <button type="submit" className="btn btn-primary btn-block">Registrate</button>
        </form>
        <div className="or-separator d-flex justify-content-between align-items-center py-4">
          <hr className="flex-grow-1 mr-3 ml-4"/>
          <h6 className="text-center mb-0">o</h6>
          <hr className="flex-grow-1 ml-3 mr-4"/>
        </div>
        <BtnGoogleLogin method="register"/>
        <div className="text-center mt-5">
          <h6>¿Ya tienes cuenta? <NavLink to="/login" className="d-inline p-0">Inicia Seción</NavLink></h6>
        </div>
      </div>
    </div>
  );
}

export default PlatformRegisterView;
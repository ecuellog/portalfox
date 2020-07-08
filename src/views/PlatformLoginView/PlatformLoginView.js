import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import BtnGoogleLogin from '../../components/BtnGoogleLogin';
import './PlatformLoginView.scss';

function PlatformLoginView() {
  const [creds, setCreds] = useState({
    email: '',
    password:''
  });

  let history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
    .then((res) => {
      console.log(res);
      history.push('/');
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
    <div className="Component__PlatformLoginView d-flex flex-column justify-content-center h-100">
      <h1 className="text-center mb-5">Log into Portalfox</h1>
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
        <button type="submit" className="btn btn-primary btn-block">Login</button>
      </form>
      <h6 className="py-4 text-center">or</h6>
      <BtnGoogleLogin method="login"/>
    </div>
  );
}

export default PlatformLoginView;
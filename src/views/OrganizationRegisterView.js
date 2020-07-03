import React, { useState } from 'react';
import * as firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import BtnGoogleLogin from '../components/BtnGoogleLogin';

function OrganizationRegisterView() {
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
      <h2>Register</h2>
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
        <button type="submit">Register</button>
        <div>
          <p>OR</p>
          <BtnGoogleLogin method="register" org="true"/>
        </div>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    organizationId: state.auth.organizationId
  }
};

export default connect(mapStateToProps, null)(OrganizationRegisterView);
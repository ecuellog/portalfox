import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import AuthService from '../services/auth';

function BtnGoogleLogin(props) {
  let history = useHistory();

  function onGoogleLoginSuccess(googleUser) {
    if (props.method === 'login') {
      AuthService.platformGoogleLogin(googleUser.getAuthResponse().id_token)
        .then((res) => {
          console.log(res);
          history.push('/');
        })
        .catch((error) => {
          console.log(error);
          alert('There was an error using Google Login');
        })
    }

    if (props.method === 'register') {
      AuthService.platformGoogleRegister(googleUser.getAuthResponse().id_token)
        .then((res) => {
          console.log(res);
          history.push('/');
        })
        .catch((error) => {
          console.log(error);
          alert('There was an error using Google Registration');
        })
    }
  }

  function onGoogleLoginFailure(res) {
    console.log('Failure:');
    console.log(res);
  }

  return (
    <GoogleLogin
      clientId="363106845702-sg7818avj5jv0actub50qer9qpoom27q.apps.googleusercontent.com"
      buttonText={props.method === 'login'? 'Login with Google' : 'Register with Google'}
      onSuccess={onGoogleLoginSuccess}
      onFailure={onGoogleLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default BtnGoogleLogin;
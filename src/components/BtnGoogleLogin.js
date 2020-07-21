import React from 'react';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import AuthService from '../services/auth';
import googleLogo from '../assets/images/google/g-logo.png';

function BtnGoogleLogin(props) {
  let history = useHistory();

  function onGoogleLoginSuccess(googleUser) {
    callBackendAuth(googleUser)
      .then((res) => {
        console.log(res);
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        alert('There was an error using Google Login');
      })
  }

  function callBackendAuth(googleUser) {
    if (props.method === 'login') {
      return AuthService.platformGoogleLogin(googleUser.getAuthResponse().id_token)
    } else if (props.method === 'register') {
      return AuthService.platformGoogleRegister(googleUser.getAuthResponse().id_token)
    } else {
      throw new Error('Method prop not set correctly.');
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
      render={renderProps => (
        <button
          className="btn btn-google"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <img className="google-logo" src={googleLogo}></img>
          <span>{props.method === 'login' ? 'Login' : 'Register'} with Google</span>
        </button>
      )}
    />
  );
}

export default BtnGoogleLogin;
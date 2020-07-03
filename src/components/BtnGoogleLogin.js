import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import AuthService from '../services/auth';

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
    if (props.method === 'login' && props.org === true) {
      return AuthService.organizationGoogleLogin(googleUser.getAuthResponse().id_token, props.organizationId)
    }
    if (props.method === 'login' && props.org === false) {
     return AuthService.platformGoogleLogin(googleUser.getAuthResponse().id_token)
    }
    if (props.method === 'register' && props.org === true) {
      return AuthService.organizationGoogleRegister(googleUser.getAuthResponse().id_token, props.organizationId, inviteCode)
    }
    if (props.method === 'register' && props.org === false) {
      return AuthService.platformGoogleRegister(googleUser.getAuthResponse().id_token)
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

function mapStateToProps(state) {
  return {
    organizationId: state.auth.organizationId
  }
};

export default connect(mapStateToProps, null)(BtnGoogleLogin);
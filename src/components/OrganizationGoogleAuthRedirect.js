import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import AuthService from '../services/auth';

function OrganizationGoogleAuthRedirect(props) {
  const gLoginBtn= useRef(null);
  let history = useHistory();
  let queryParams = new URLSearchParams(useLocation().search);
  let doneAuth = false;

  function onLoadFinished() {
    console.log(queryParams.get('orgId'));
    //if (!doneAuth) document.getElementById('googleLogin').firstChild.click();
  }

  function onGoogleLoginSuccess(googleUser) {
    doneAuth = true;
    console.log('Aaaand were back');
    console.log(googleUser);
    /*callBackendAuth(googleUser)
      .then((res) => {
        console.log(res);
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        alert('There was an error using Google Login');
      })*/
  }

  function callBackendAuth(googleUser) {
    if (props.method === 'login' && props.org === true) {
      return AuthService.organizationGoogleLogin(googleUser.getAuthResponse().id_token, props.organizationId)
    }
    if (props.method === 'register' && props.org === true) {
      return AuthService.organizationGoogleRegister(googleUser.getAuthResponse().id_token, props.organizationId, inviteCode)
    }
  }

  function onGoogleLoginFailure(res) {
    console.log('Failure:');
    console.log(res);
  }

  return (
    <div id="googleLogin" style={{display:'inline'}} >
      <GoogleLogin
        clientId="363106845702-sg7818avj5jv0actub50qer9qpoom27q.apps.googleusercontent.com"
        buttonText={props.method === 'login'? 'Login with Google' : 'Register with Google'}
        onSuccess={onGoogleLoginSuccess}
        onFailure={onGoogleLoginFailure}
        //onAutoLoadFinished={onLoadFinished}
        forwardRef={gLoginBtn}
        autoLoad={true}
      />
    </div>
  );
}

export default OrganizationGoogleAuthRedirect;
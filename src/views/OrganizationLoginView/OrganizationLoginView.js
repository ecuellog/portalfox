import React, { useState } from 'react';
import AuthService from '../../services/auth';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import buildUrl from 'build-url';
import './OrganizationLoginView.scss';
import googleLogo from '../../assets/images/google/g-logo.png';
import * as _ from 'lodash';

function OrganizationLoginView(props) {
  const [creds, setCreds] = useState({
    email: '',
    password:''
  });

  let history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    AuthService.organizationLogin(creds.email, creds.password, props.organization.id)
      .then((res) => {
        console.log(res);
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function redirectToGoogleLogin(e) {
    e.preventDefault();
    let url = buildUrl(`${process.env.APP_PROTOCOL}://${process.env.APP_URL}/orgGoogleAuthRedirect`, {
      queryParams: {
        orgId: props.organization.id,
        authMode: 'login'
      }
    });
    window.location.assign(url);
  }

  return (
    <div className="login-register-container d-flex flex-column justify-content-center h-100">
      <h1 className="text-center mb-5">Log into {_.get(props, 'organization.name')} </h1>
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
      <button
        className="btn btn-google"
        onClick={redirectToGoogleLogin}
      >
        <img className="google-logo" src={googleLogo}></img>
        <span>Login with Google</span>
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    organization: state.organizations.activeOrganization
  }
};

export default connect(mapStateToProps, null)(OrganizationLoginView);

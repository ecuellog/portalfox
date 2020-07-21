import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import buildUrl from 'build-url';
import googleLogo from '../../assets/images/google/g-logo.png';
import AuthService from '../../services/auth';
import * as _ from 'lodash';

function OrganizationRegisterView(props) {
  const [creds, setCreds] = useState({
    email: '',
    password:''
  });

  let history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    AuthService.organizationRegister(creds.email, creds.password, props.organization.id)
      .then((res) => {
        console.log(res);
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function redirectToGoogleRegister(e) {
    e.preventDefault();
    let url = buildUrl('http://lvh.me:4001/orgGoogleAuthRedirect', {
      queryParams: {
        orgId: props.organization.id,
        authMode: 'register'
      }
    });
    window.location.assign(url);
  }

  return (
    <div className="login-register-container d-flex flex-column justify-content-center h-100">
      <h1 className="text-center mb-5">Register at {_.get(props, 'organization.name')} </h1>
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
        <button type="submit" className="btn btn-primary btn-block">Register</button>
      </form>
      <h6 className="py-4 text-center">or</h6>
      <button
        className="btn btn-google"
        onClick={redirectToGoogleRegister}
      >
        <img className="google-logo" src={googleLogo}></img>
        <span>Register with Google</span>
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    organization: state.organizations.activeOrganization
  }
};

export default connect(mapStateToProps, null)(OrganizationRegisterView);

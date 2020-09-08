import React, { useState } from 'react';
import { useHistory, NavLink } from "react-router-dom";
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
    let url = buildUrl(`${process.env.APP_PROTOCOL}://${process.env.APP_URL}/orgGoogleAuthRedirect`, {
      queryParams: {
        orgId: props.organization.id,
        authMode: 'register'
      }
    });
    window.location.assign(url);
  }

  return (
    <div className="d-flex flex-column justify-content-center h-100">
      <img className="login-register-logo" src={_.get(props, 'organization.imageSrc')}></img>
      <div className="login-register-container">
        <h2 className="mb-4"> Registrate </h2>
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
        <button
          className="btn btn-google"
          onClick={redirectToGoogleRegister}
        >
          <img className="google-logo" src={googleLogo}></img>
          <span>Registrate con Google</span>
        </button>
        <div className="text-center mt-5">
          <h6>¿Ya tienes cuenta? <NavLink to="/login" className="d-inline p-0">Inicia Sesión</NavLink></h6>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    organization: state.organizations.activeOrganization
  }
};

export default connect(mapStateToProps, null)(OrganizationRegisterView);

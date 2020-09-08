import React, { useState } from 'react';
import AuthService from '../../services/auth';
import { connect } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
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
    <div className="d-flex flex-column justify-content-center h-100">
      <img className="login-register-logo" src={_.get(props, 'organization.imageSrc')}></img>
      <div className="login-register-container">
        <h2 className="mb-4">Iniciar Sesion </h2>
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
            <h6 className="text-right mt-1"><NavLink to="/register">¿Olvidaste tu contrasena?</NavLink></h6>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Iniciar Sesion</button>
        </form>
        <div className="or-separator d-flex justify-content-between align-items-center py-4">
          <hr className="flex-grow-1 mr-3 ml-4"/>
          <h6 className="text-center mb-0">o</h6>
          <hr className="flex-grow-1 ml-3 mr-4"/>          
        </div>
        <button
          className="btn btn-google"
          onClick={redirectToGoogleLogin}
        >
          <img className="google-logo" src={googleLogo}></img>
          <span>Inicia Sesion con Google</span>
        </button>
        <div className="text-center mt-5">
          <h6>¿No tienes cuenta? <NavLink to="/register" className="d-inline p-0">Registrate aqui</NavLink></h6>
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

export default connect(mapStateToProps, null)(OrganizationLoginView);

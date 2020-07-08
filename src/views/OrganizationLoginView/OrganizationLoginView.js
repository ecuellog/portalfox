import React, { useState } from 'react';
import AuthService from '../../services/auth';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import buildUrl from 'build-url';

function OrganizationLoginView(props) {
  const [creds, setCreds] = useState({
    email: '',
    password:''
  });

  let history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    AuthService.organizationLogin(creds.email, creds.password, props.organizationId)
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
    let url = buildUrl('http://lvh.me:4001/orgGoogleAuthRedirect', {
      queryParams: {
        orgId: props.organizationId,
        authMode: 'login'
      }
    });
    window.location.assign(url);
  }

  return (
    <div>
      OrganizationLoginView
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
        <button type="submit">Login</button>
      </form>
      <div>
        <p>OR</p>
        <button onClick={redirectToGoogleLogin}>Login with Google</button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    organizationId: state.auth.organizationId
  }
};

export default connect(mapStateToProps, null)(OrganizationLoginView);
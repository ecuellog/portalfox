import React from 'react';
import Cookies from 'js-cookie';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import { setAuthenticatedUser } from './store/actions/auth';
import * as firebase from "firebase/app";

function App(props) {
  var spaceName = Cookies.get('space_name');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      props.setAuthenticatedUser(user);
    } else {
      props.unsetAuthenticatedUser();
    }
  });

  return (
    <div>
      <h1>
        Hello World
      </h1>
      <h2>
        Your are inside the {spaceName} Space!
      </h2>
      <h3>
        { props.isAuthenticated && 
          <span>You are authenticated as <b>{props.authenticatedUser.email}</b></span>
        }
        { !props.isAuthenticated && 
          <span>You are not authenticated</span>
        }
      </h3>
      <Router>
        <Switch>
          {/*<Route path="/public">
            <PublicPage />
  </Route>*/}
          <Route path="/login">
            <LoginView />
          </Route>
          <Route path="/register">
            <RegisterView />
          </Route>
          {/*<PrivateRoute path="/protected">
            <ProtectedPage />
  </PrivateRoute>*/}
        </Switch>
      </Router>
    </div>
  );
}

function mapDispatchToProps(dispatch){
  return {
    setAuthenticatedUser: (user) => dispatch(setAuthenticatedUser(user)),
    unsetAuthenticatedUser: () => dispatch(unsetAuthenticatedUser())
  }
}

function mapStateToProps(state){
  return {
    authenticatedUser: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
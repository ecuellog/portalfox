import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import OrganizationApp from './OrganizationApp';
import PlatformApp from './PlatformApp';
import { connect } from 'react-redux';
import { setAuthenticatedUser, unsetAuthenticatedUser } from './store/actions/auth';
import * as firebase from "firebase/app";
import './index.scss';

function App(props) {
  let spaceName = Cookies.get('space_name');

  useEffect(() => {
    let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setAuthenticatedUser(user);
      } else {
        props.unsetAuthenticatedUser();
      }
    });

    return () => {unsubscribe();}
  }, []);

  return (
    <div>
      <div>
        {
          spaceName && 
          <OrganizationApp />
        }
        {
          !spaceName && 
          <PlatformApp />
        }
      </div>
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
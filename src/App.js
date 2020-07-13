import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import OrganizationApp from './OrganizationApp';
import PlatformApp from './PlatformApp';
import { connect } from 'react-redux';
import { setAuthenticatedUser, unsetAuthenticatedUser } from './store/actions/auth';
import * as firebase from "firebase/app";
import './index.scss';
import Loader from './components/Loader/Loader';

function App(props) {
  let spaceName = Cookies.get('space_name');
  let [initialAuthDone, setInitialAuthDone] = useState(false);

  useEffect(() => {
    let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setAuthenticatedUser(user);
      } else {
        props.unsetAuthenticatedUser();
      }

      if (!initialAuthDone) setInitialAuthDone(true);
    });

    return () => {unsubscribe();}
  }, []);

  return (
    <div>
      {
        !initialAuthDone &&
        <Loader/>
      }
      {
        initialAuthDone && 
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
      }
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
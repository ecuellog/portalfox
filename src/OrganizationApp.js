import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { setOrganization } from './store/actions/auth';
import NotFoundView from './views/NotFoundView';
import OrganizationService from './services/firebase/organizations';
import OrganizationLoginView from './views/OrganizationLoginView/OrganizationLoginView';
import OrganizationMainView from './views/OrganizationMainView';
import WrapperPrivateRoute from './components/WrapperPrivateRoute';
import WrapperAntiPrivateRoute from './components/WrapperAntiPrivateRoute';
import OrganizationRegisterView from './views/OrganizationRegisterView/OrganizationRegisterView';
import OrganizationGoogleAuthReturn from './components/OrganizationGoogleAuthReturn';
import Loader from './components/Loader/Loader';

function OrganizationApp(props) {
  let spaceName = Cookies.get('space_name');
  const [spaceExists, setSpaceExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OrganizationService.subdomainExists(spaceName)
      .then((res) => {
        if (res) {
          setSpaceExists(true);
          OrganizationService.getBySubdomain(spaceName)
            .then((org) => {
              props.setOrganization(org);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        setLoading(false);
      });
  }, []);


  return (
    <div>
      { !spaceExists && !loading &&
        <NotFoundView />
      }
      {
        loading && 
        <Loader/>
      }
      {
        spaceExists && !loading &&
        <Router>
          <Switch>
            <Route path="/googleAuthReturn">
              <OrganizationGoogleAuthReturn />
            </Route>

            <WrapperAntiPrivateRoute path="/login">
              <OrganizationLoginView />
            </WrapperAntiPrivateRoute>

            <WrapperAntiPrivateRoute path="/register">
              <OrganizationRegisterView />
            </WrapperAntiPrivateRoute>
            
            <WrapperPrivateRoute path="/">
              <OrganizationMainView />
            </WrapperPrivateRoute>
          </Switch>
        </Router>
      }
    </div>
  );
}

function mapDispatchToProps(dispatch){
  return {
    setOrganization: (org) => dispatch(setOrganization(org))
  }
}

function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationApp);

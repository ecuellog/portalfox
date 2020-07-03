import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { setOrganizationId } from './store/actions/auth';
import NotFoundView from './views/NotFoundView';
import OrganizationService from './services/firebase/organizations';
import OrganizationLoginView from './views/OrganizationLoginView';
import OrganizationMainView from './views/OrganizationMainView';
import WrapperPrivateRoute from './components/WrapperPrivateRoute';
import WrapperAntiPrivateRoute from './components/WrapperAntiPrivateRoute';
import OrganizationRegisterView from './views/OrganizationRegisterView';

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
              props.setOrganizationId(org.id);
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
        <h1>Loading...</h1>
      }
      {
        spaceExists && !loading &&
        <Router>
          <Switch>
            <WrapperAntiPrivateRoute path="/login">
              <OrganizationLoginView />
            </WrapperAntiPrivateRoute>
            <WrapperAntiPrivateRoute path="/login">
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
    setOrganizationId: (orgId) => dispatch(setOrganizationId(orgId))
  }
}

function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationApp);
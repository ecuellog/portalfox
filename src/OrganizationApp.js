import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { setActiveOrganization } from './store/actions/organizations';
import NotFoundView from './views/NotFoundView';
import OrganizationService from './services/firebase/organizations';
import OrganizationLoginView from './views/OrganizationLoginView/OrganizationLoginView';
import OrganizationChannelView from './views/OrganizationChannelView/OrganizationChannelView';
import WrapperPrivateRoute from './components/WrapperPrivateRoute';
import WrapperAntiPrivateRoute from './components/WrapperAntiPrivateRoute';
import OrganizationRegisterView from './views/OrganizationRegisterView/OrganizationRegisterView';
import OrganizationGoogleAuthReturn from './components/OrganizationGoogleAuthReturn';
import Loader from './components/Loader/Loader';
import OrganizationArticleNewView from './views/OrganizationArticleNewView/OrganizationArticleNewView';
import OrganizationArticleView from './views/OrganizationArticleView/OrganizationArticleView';

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
              props.setActiveOrganization(org);
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
            
            <WrapperPrivateRoute path="/" exact>
              <Redirect to="/channels/all"/>
            </WrapperPrivateRoute>

            <WrapperPrivateRoute path="/channels/:channelId" exact>
              <OrganizationChannelView />
            </WrapperPrivateRoute>

            <WrapperPrivateRoute path="/channels/:channelId/articles/new">
              <OrganizationArticleNewView />
            </WrapperPrivateRoute>

            <WrapperPrivateRoute path="/channels/:channelId/articles/:articleId">
              <OrganizationArticleView />
            </WrapperPrivateRoute>
          </Switch>
        </Router>
      }
    </div>
  );
}

function mapDispatchToProps(dispatch){
  return {
    setActiveOrganization: (org) => dispatch(setActiveOrganization(org))
  }
}

function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationApp);

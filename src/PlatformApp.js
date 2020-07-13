import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import PlatformRegisterView from './views/PlatformRegisterView/PlatformRegisterView';
import PlatformLoginView from './views/PlatformLoginView/PlatformLoginView';
import PlatformDashboardView from './views/PlatformDashboardView';
import NotFoundView from './views/NotFoundView';
import WrapperAntiPrivateRoute from './components/WrapperAntiPrivateRoute';
import WrapperPrivateRoute from './components/WrapperPrivateRoute';
import OrganizationGoogleAuthRedirect from './components/OrganizationGoogleAuthRedirect';
import PlatformOrgListView from './views/PlatformOrgListView/PlatformOrgListView';

function PlatformApp(props) {
  return (
    <div>
      <Router>
        <Switch>
          <WrapperAntiPrivateRoute path="/login">
            <PlatformLoginView />
          </WrapperAntiPrivateRoute>

          <WrapperAntiPrivateRoute path="/register">
            <PlatformRegisterView />
          </WrapperAntiPrivateRoute>

          <Route path="/orgGoogleAuthRedirect">
            <OrganizationGoogleAuthRedirect />
          </Route>

          <WrapperPrivateRoute path="/" exact>
            <PlatformOrgListView/>
          </WrapperPrivateRoute>

          <WrapperPrivateRoute path="/overview">
            <PlatformDashboardView />
          </WrapperPrivateRoute>
          
          <Route path="*">
            <NotFoundView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function mapDispatchToProps(dispatch){
  return {}
}

function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformApp);
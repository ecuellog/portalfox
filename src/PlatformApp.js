import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PlatformRegisterView from './views/PlatformRegisterView/PlatformRegisterView';
import PlatformLoginView from './views/PlatformLoginView/PlatformLoginView';
import PlatformOrgOverviewView from './views/PlatformOrgOverviewView/PlatformOrgOverviewView';
import NotFoundView from './views/NotFoundView';
import WrapperAntiPrivateRoute from './components/WrapperAntiPrivateRoute';
import WrapperPrivateRoute from './components/WrapperPrivateRoute';
import OrganizationGoogleAuthRedirect from './components/OrganizationGoogleAuthRedirect';
import PlatformOrgListView from './views/PlatformOrgListView/PlatformOrgListView';
import PlatformOrgChannelsView from './views/PlatformOrgChannelsView/PlatformOrgChannelsView';
import PlatformOrgRoutes from './components/PlatformOrgRoutes/PlatformOrgRoutes';

function PlatformApp(props) {
  return (
    <div>
      <Router>
        <Switch>
          {/* For Organization authentication only. */}
          <Route path="/orgGoogleAuthRedirect">
            <OrganizationGoogleAuthRedirect />
          </Route>

          {/* Authentication */}
          <WrapperAntiPrivateRoute path="/login">
            <PlatformLoginView />
          </WrapperAntiPrivateRoute>

          <WrapperAntiPrivateRoute path="/register">
            <PlatformRegisterView />
          </WrapperAntiPrivateRoute>

          {/* Dashboard routes */}
          <WrapperPrivateRoute path="/" exact>
            <PlatformOrgListView/>
          </WrapperPrivateRoute>

          <WrapperPrivateRoute path="/org/:orgId">
            <PlatformOrgRoutes />
          </WrapperPrivateRoute>
          
          {/* 404 */}
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
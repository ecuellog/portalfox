import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import PlatformRegisterView from './views/PlatformRegisterView';
import PlatformLoginView from './views/PlatformLoginView';
import PlatformDashboardView from './views/PlatformDashboardView';
import NotFoundView from './views/NotFoundView';

function PlatformApp(props) {
  return (
    <div>
      <Router>
        <Switch>
          {/*<Route path="/public">
            <PublicPage />
  </Route>*/}
          <Route path="/login">
            <PlatformLoginView />
          </Route>
          <Route path="/register">
            <PlatformRegisterView />
          </Route>
          <Route path="/dashboard">
            <PlatformDashboardView />
          </Route>
          <Route path="/404">
            <NotFoundView />
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
  return {}
}

function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformApp);
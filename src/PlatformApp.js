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
import WrapperAntiPrivateRoute from './components/WrapperAntiPrivateRoute';
import WrapperPrivateRoute from './components/WrapperPrivateRoute';

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
          <WrapperPrivateRoute path="/">
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
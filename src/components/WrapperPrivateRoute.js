import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect
} from "react-router-dom";

function WrapperPrivateRoute(props) {
  let { isAuthenticated, children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, null)(WrapperPrivateRoute)
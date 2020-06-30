import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect
} from "react-router-dom";

// Wrapper for routes that should not be rendered if a user is authenticated.
function WrapperAntiPrivateRoute(props) {
  let { isAuthenticated, children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
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

export default connect(mapStateToProps, null)(WrapperAntiPrivateRoute)
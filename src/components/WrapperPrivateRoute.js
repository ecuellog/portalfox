import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';

function PrivateRoute({ children }) {
  return (
    <Route
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
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
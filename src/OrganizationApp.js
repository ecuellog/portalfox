import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import NotFoundView from './views/NotFoundView';
import OrganizationService from './services/firebase/organizations';
import OrganizationLoginView from './views/OrganizationLoginView';
import OrganizationMainView from './views/OrganizationMainView';

function OrganizationApp(props) {
  let spaceName = Cookies.get('space_name');
  const [spaceExists, setSpaceExists] = useState(false);
  const [loading, setLoading] = useState(true);

  OrganizationService.subdomainExists(spaceName)
    .then((res) => {
      if (res) {
        setSpaceExists(true);
      }
      setLoading(false);
    });


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
            {/*<Route path="/public">
              <PublicPage />
    </Route>*/}
            <Route path="/login">
              <OrganizationLoginView />
            </Route>
            <Route path="/">
              <OrganizationMainView />
            </Route>
            {/*<PrivateRoute path="/protected">
              <ProtectedPage />
    </PrivateRoute>*/}
          </Switch>
        </Router>
      }
    </div>
  );
}

function mapDispatchToProps(dispatch){
  return {}
}

function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationApp);
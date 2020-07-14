import React from 'react';
import { Route, Router, Switch } from "react-router-dom";
import WrapperOrgViews from '../../components/WrapperOrgViews/WrapperOrgViews';
import PlatformOrgOverviewView from '../../views/PlatformOrgOverviewView/PlatformOrgOverviewView';
import PlatformOrgChannelsView from '../../views/PlatformOrgChannelsView/PlatformOrgChannelsView';

function PlatformOrgRoutes(props) {
  return (
    <WrapperOrgViews>
      <Router>
        <Switch>
          <Route path="/" exact>
            <PlatformOrgOverviewView />
          </Route>
          <Route path="/channels" exact>
            <PlatformOrgChannelsView />
          </Route>
        </Switch>
      </Router>
    </WrapperOrgViews>
  );
}

export default PlatformOrgRoutes;
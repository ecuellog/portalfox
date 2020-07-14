import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { withRouter } from 'react-router';
import WrapperOrgViews from '../../components/WrapperOrgViews/WrapperOrgViews';
import PlatformOrgOverviewView from '../../views/PlatformOrgOverviewView/PlatformOrgOverviewView';
import PlatformOrgChannelsView from '../../views/PlatformOrgChannelsView/PlatformOrgChannelsView';

function PlatformOrgRoutes(props) {
  return (
    <WrapperOrgViews>
      <div>
        <Route path={`${props.match.path}`} exact>
          <PlatformOrgOverviewView />
        </Route>
        <Route path={`${props.match.path}/channels`} exact>
          <PlatformOrgChannelsView />
        </Route>
      </div>
    </WrapperOrgViews>
  );
}

export default withRouter(PlatformOrgRoutes);
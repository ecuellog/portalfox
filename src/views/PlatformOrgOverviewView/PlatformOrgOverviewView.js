import React from 'react';
import PlatformOrgOverview from '../../components/PlatformOrgOverview/PlatformOrgOverview';
import WrapperOrgViews from '../../components/WrapperOrgViews/WrapperOrgViews';

function PlatformOrgOverviewView(props) {
  return (
    <WrapperOrgViews>
      <PlatformOrgOverview/>
    </WrapperOrgViews>
  );
}

export default PlatformOrgOverviewView;
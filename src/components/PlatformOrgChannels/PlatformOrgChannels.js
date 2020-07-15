import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

function PlatformOrgOverview(props) {
  return (
    <div>
      Channels for {_.get(props, 'organization.name')}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    organization: state.organizations.activeOrganization
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (PlatformOrgOverview);
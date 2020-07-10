import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchOrganizations } from '../store/actions/organizations';
import WrapperSideBar from '../components/WrapperSideBar/WrapperSideBar';
import PlatformDashboardSideBar from '../components/PlatformDashboardSideBar/PlatformDashboardSideBar';
import PlatformDashboardOverview from '../components/PlatformDashboardOverview/PlatformDashboardOverview';

function PlatformDashboardView(props) {
  useEffect(() => {
    if(props.isAuthenticated) {
      props.fetchOrganizations();
    }
  }, [props.isAuthenticated]);

  return (
    <WrapperSideBar sidebar={<PlatformDashboardSideBar/>}>
      <PlatformDashboardOverview/>
    </WrapperSideBar>
  );
}

function mapStateToProps(state){
  return {
    authenticatedUser: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    organizations: state.organizations.organizations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOrganizations: () => dispatch(fetchOrganizations())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformDashboardView);
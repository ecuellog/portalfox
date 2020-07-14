import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchOrganizations, setActiveOrganization } from '../../store/actions/organizations';
import WrapperSideBar from '../../components/WrapperSideBar/WrapperSideBar';
import PlatformOrgSideBar from '../../components/PlatformOrgSideBar/PlatformOrgSideBar';
import Loader from '../../components/Loader/Loader';

function WrapperOrgViews(props) {
  useEffect(() => {
    if(props.isAuthenticated) {
      props.fetchOrganizations();
    }
  }, [props.isAuthenticated]);

  useEffect(() => {
    if (props.firstOrganizationsFetchDone) {
      let orgId = props.match.params.orgId;
  
      let queryOrg = props.organizations.find(org => org.id === orgId);
  
      if(!queryOrg) {
        // Redirect to not found
        console.log('Org does not exist');
      } else {
        props.setActiveOrganization(queryOrg);
      }
    }
  }, [props.firstOrganizationsFetchDone, props.match.params.orgId]);

  return (
    <div>
      {
        props.firstOrganizationsFetchDone &&
        <WrapperSideBar sidebar={<PlatformOrgSideBar/>}>
          {props.children}
        </WrapperSideBar>
      }
      {
        !props.firstOrganizationsFetchDone &&
        <Loader/>
      }
    </div>
  );
}

function mapStateToProps(state){
  return {
    authenticatedUser: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    organizations: state.organizations.organizations,
    firstOrganizationsFetchDone: state.organizations.firstOrganizationsFetchDone
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    setActiveOrganization: (organization) => dispatch(setActiveOrganization(organization))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrapperOrgViews));
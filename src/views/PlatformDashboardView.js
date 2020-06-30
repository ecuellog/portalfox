import React, { useState, useEffect } from 'react';
import * as firebase from "firebase/app";
import { connect } from 'react-redux';
import CreateOrganization from '../components/CreateOrganization';
import { fetchOrganizations } from '../store/actions/organizations';

function PlatformDashboardView(props) {
  useEffect(() => {
    if(props.isAuthenticated) {
      props.fetchOrganizations();
    }
  }, [props.isAuthenticated]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>The organizations you manage will be listed here</p>

      { props.organizations.map(org => (
        <li key={org.id}>{org.name} - {org.subdomain}.portalfox.com.mx</li>
      ))}

      <CreateOrganization/>
    </div>
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
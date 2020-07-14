import React from 'react';
import { NavLink } from 'react-router-dom';
import appLogo from '../../assets/images/logo_portalfox.png';
import './PlatformDashboardSideBar.scss';
import * as firebase from "firebase/app";
import * as _ from 'lodash';

function PlatformDashboardSideBar(props) {
  function onLogout() {
    firebase.auth().signOut()
      .then(() => {
        console.log('success');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <img src={appLogo} className="standard-app-logo"></img>
      <hr></hr>
      <h3>{_.get(props, 'organization.name')}</h3>
      <NavLink className="link" activeClassName="active" to="/overview" exact>Overview</NavLink>
      <NavLink className="link" activeClassName="active" to="/users">Users</NavLink>
      <NavLink className="link" activeClassName="active" to="/channels">Channels</NavLink>
      <NavLink className="link" activeClassName="active" to="/billing">Billing</NavLink>
      <NavLink className="link" activeClassName="active" to="/settings">Settings</NavLink>
      <div className="flex-grow-1 d-flex align-items-end mb-3">
        <a className="link w-100 clickable" onClick={onLogout}>Logout</a>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    organization: state.organizations.activeOrganization,
    organizations: state.organizations.organizations
  }
}

export default PlatformDashboardSideBar;
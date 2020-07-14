import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import appLogo from '../../assets/images/logo_portalfox.png';
import './PlatformDashboardSideBar.scss';
import * as firebase from "firebase/app";
import * as _ from 'lodash';
import { Dropdown } from 'react-bootstrap';

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

  function getOrgId() {
    return _.get(props, 'organization.id');
  }

  return (
    <>
      <img src={appLogo} className="standard-app-logo"></img>
      <hr></hr>
      <Dropdown alignRight>
        <Dropdown.Toggle
          as="h5"
          className="d-flex justify-content-between align-items-center clickable"
        >
          {_.get(props, 'organization.name')}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          { props.organizations.map(org => (
            <Dropdown.Item
              key={org.id}
              activeClassName="active" to={`/org/${org.id}`}
              as={NavLink}
            >
              {org.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <NavLink className="link" activeClassName="active" to={`/org/${getOrgId()}`} exact>Overview</NavLink>
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

export default connect(mapStateToProps, null) (PlatformDashboardSideBar);
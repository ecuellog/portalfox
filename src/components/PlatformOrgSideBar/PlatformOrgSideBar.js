import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import appLogo from '../../assets/images/logo_portalfox.png';
import './PlatformOrgSideBar.scss';
import * as firebase from "firebase/app";
import * as _ from 'lodash';
import { Dropdown } from 'react-bootstrap';

function PlatformOrgSideBar(props) {
  let location = useLocation();
  let links = {
    overview: 'Overview',
    users: 'Users',
    channels: 'Channels',
    billing: 'Billing',
    settings: 'Settings'
  };
  const [currentLink, setCurrentLink] = useState(null);

  useEffect(() => {
    let paths = location.pathname.split('/');
    setCurrentLink(paths[3]);
  }, [location]);

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
          <Dropdown.Item
            to={`/`}
            as={NavLink}
            exact
          >
            See all projects
          </Dropdown.Item>
          <Dropdown.Divider/>
          { props.organizations.map(org => (
            <Dropdown.Item
              key={org.id}
              activeClassName="active"
              to={`/org/${org.id}/${currentLink}`}
              as={NavLink}
            >
              {org.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      { Object.keys(links).map(link => (
        <NavLink className="link" key={link} activeClassName="active" to={`/org/${getOrgId()}/${link}`}>{links[link]}</NavLink>
      )) }
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

export default connect(mapStateToProps, null) (PlatformOrgSideBar);

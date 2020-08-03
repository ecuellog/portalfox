import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import * as _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import { Dropdown } from 'react-bootstrap';
import * as firebase from 'firebase/app';
import './OrganizationNavBar.scss'

function OrganizationNavBar(props) {
  function onLogout() {
    firebase.auth().signOut()
      .then(() => {
        console.log('success');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const AvatarDropdownToggle = React.forwardRef((props, ref) => (
    <Avatar
      alt={props.user.displayName}
      src={props.user.photoURL}
      className="clickable avatar-colors green"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        props.onClick(e);
      }}
    >E</Avatar>
  ));

  return (
    <nav className="Component_OrganizationNavBar navbar navbar-light fixed-top">
      { _.get(props, 'organization.imageSrc') ?
        <img className="logo" src={props.organization.imageSrc}></img> : 
        <h2 className="logo mb-0">{_.get(props, 'organization.name')}</h2>
      }
      <Dropdown alignRight>
        <Dropdown.Toggle
          as={AvatarDropdownToggle}
          user={props.user}
        >
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            to={`/users/${props.user.id}`}
            as={NavLink}
            exact
          >
            <i className="dropdown-icon far fa-user"></i>
            <span className="ml-4">Your Profile</span>
          </Dropdown.Item>  
          <Dropdown.Divider />
          <Dropdown.Item as="div" onClick={onLogout}>
            <i className="dropdown-icon fas fa-sign-out-alt"></i>
            <span className="ml-4">Logout</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
}

function mapStateToProps(state){
  return {
    user: state.auth.user,
    organization: state.organizations.activeOrganization
  }
}

export default withRouter(connect(mapStateToProps, null)(OrganizationNavBar));

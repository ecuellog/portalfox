import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import { Dropdown } from 'react-bootstrap';
import * as firebase from 'firebase/app';
import EdgardoAvatar from '../../assets/images/edgardo.jpg';

function PlatformAvatarDropdown(props) {
  function onLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('success');
      })
      .catch(error => {
        console.error(error);
      });
  }

  const AvatarDropdownToggle = React.forwardRef((props, ref) => (
    <Avatar
      alt={props.user.displayName}
      src={EdgardoAvatar}
      className="clickable avatar-colors"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        props.onClick(e);
      }}
    >
      E
    </Avatar>
  ));

  return (
    <div className="Component_AvatarDropdownToggle">
      <Dropdown alignRight>
        <Dropdown.Toggle
          as={AvatarDropdownToggle}
          user={props.user}
        ></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as="div" onClick={onLogout}>
            <i className="dropdown-icon fas fa-sign-out-alt"></i>
            <span className="ml-4">Logout</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default withRouter(connect(mapStateToProps, null)(PlatformAvatarDropdown));

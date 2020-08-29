import React from 'react';
import { connect } from 'react-redux';
import './OrganizationSideBarLogo.scss';
import * as _ from 'lodash';

function OrganizationSideBarLogo(props) {
  return (
    <div className="Component_OrganizationSideBarLogo">
      {_.get(props, 'organization.imageSrc') ? (
        <img className="logo" src={props.organization.imageSrc}></img>
      ) : (
        <h2 className="logo mb-0 text-center">
          {_.get(props, 'organization.name')}
        </h2>
      )}
      <hr />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    organization: state.organizations.activeOrganization
  };
}

export default connect(mapStateToProps)(OrganizationSideBarLogo);

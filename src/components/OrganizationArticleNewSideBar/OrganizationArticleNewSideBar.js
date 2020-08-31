import React from 'react';
import { useHistory, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import OrganizationSideBarLogo from '../OrganizationSideBarLogo/OrganizationSideBarLogo';
import './OrganizationArticleNewSideBar.scss';
import * as _ from 'lodash';

function OrganizationArticleNewSideBar(props) {
  let history = useHistory();
  let channelId = props.match.params.channelId;

  function goBack() {
    history.goBack();
  }

  function isActive(match, location, tabName) {
    if (!match.isExact) {
      return false;
    }

    if (location.search === `?tab=${tabName}`) {
      return true;
    }

    if (!location.search && !tabName) {
      return true;
    }

    return false;
  }

  return (
    <div className="Component_OrganizationArticleNewSideBar">
      <OrganizationSideBarLogo />
      <div
        className="link mb-3 clickable"
        onClick={goBack}
      >
        <i className="sidebar-icon pf-icon-left"></i>
        <span>Atras</span>
      </div>
      <NavLink
        className="link mb-3"
        activeClassName="active"
        to={`/channels/${channelId}/articles/new`}
        isActive={(match, location) => isActive(match, location, '')}
        replace
      >
        <i className="sidebar-icon pf-icon-color-picker"></i>
        <span>Editar</span>
      </NavLink>
      <NavLink
        className="link mb-3"
        activeClassName="active"
        to={`/channels/${channelId}/articles/new?tab=preview`}
        isActive={(match, location) => isActive(match, location, 'preview')}
        replace
      >
        <i className="sidebar-icon pf-icon-monitor"></i>
        <span>Vista Previa</span>
      </NavLink>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    organization: state.organizations.activeOrganization
  };
}

export default withRouter(connect(mapStateToProps)(OrganizationArticleNewSideBar));

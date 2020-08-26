import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './OrganizationArticleNewSideBar.scss';
import * as _ from 'lodash';

function OrganizationArticleNewSideBar(props) {
  let history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <div className="Component_OrganizationArticleNewSideBar">
      {_.get(props, 'organization.imageSrc') ? (
        <img className="logo" src={props.organization.imageSrc}></img>
      ) : (
        <h2 className="logo mb-0 text-center">
          {_.get(props, 'organization.name')}
        </h2>
      )}
      <hr />
      <div
        className="link mb-3 clickable"
        onClick={goBack}
      >
        <i className="sidebar-icon pf-icon-left"></i>
        <span>Atras</span>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    organization: state.organizations.activeOrganization
  };
}

export default connect(mapStateToProps)(OrganizationArticleNewSideBar);

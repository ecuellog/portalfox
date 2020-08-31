import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import OrganizationSideBarLogo from '../OrganizationSideBarLogo/OrganizationSideBarLogo';
import * as _ from 'lodash';

function OrganizationArticleNewSideBar(props) {
  let history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <div className="Component_OrganizationArticleSideBar">
      <OrganizationSideBarLogo />
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

export default withRouter(OrganizationArticleNewSideBar);

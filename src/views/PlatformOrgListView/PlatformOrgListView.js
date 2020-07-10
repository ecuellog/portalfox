import React, { useState, useEffect } from 'react';
import * as firebase from "firebase/app";
import { connect } from 'react-redux';
import ModalCreateOrganization from '../../components/ModalCreateOrganization';
import { fetchOrganizations } from '../../store/actions/organizations';
import appLogo from '../../assets/images/logo_portalfox.png';
import './PlatformOrgListView.scss';

function PlatformOrgListView(props) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if(props.isAuthenticated) {
      props.fetchOrganizations();
    }
  }, [props.isAuthenticated]);

  function handleCreateModalClose() {
    setShowCreateModal(false);
  }

  function handleCreateModalOpen() {
    setShowCreateModal(true);
  }

  return (
    <div className="Component_PlatformOrgListView">
      <img src={appLogo} className="standard-app-logo p-1"></img>
      { props.organizations.length > 0 && 
        <div className="container mt-5">
          {props.organizations.map(organization => (
            <div className="card" key={organization.id}>
              <div className="card-body">
                <h4 className="card-title">{organization.name}</h4>
                <h6 className="card-subtitle mb-2 text-muted">{organization.subdomain}</h6>
              </div>
            </div>
          ))}
          <div className="col-md-4 card">
            <div className="card-body d-flex flex-column text-center justify-content-center">
              <i className="fas fa-plus create-org-icon"></i>
              <span className="mt-4 create-org-text" onClick={handleCreateModalOpen}>Create Organization</span>
            </div>
          </div>
        </div>
      }
      { props.organizations.length < 1 && 
        <div className="container mt-5">
          <div className="offset-md-1 col-md-10">
            <h2>Welcome to Portalfox</h2>
            <p>A place to instantly create your own cloud managed intrawebs to improve internal communications within you company. Click below to create your first organization!</p>
            <button className="btn btn-primary mt-3" onClick={handleCreateModalOpen}>Create Organization</button>
          </div>
        </div>
      }

      <ModalCreateOrganization
        showModal={showCreateModal}
        handleModalClose={handleCreateModalClose}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(PlatformOrgListView);
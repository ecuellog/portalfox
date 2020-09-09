import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalCreateOrganization from '../../components/ModalCreateOrganization/ModalCreateOrganization';
import { fetchOrganizations } from '../../store/actions/organizations';
import appLogo from '../../assets/images/logo_portalfox.png';
import './PlatformOrgListView.scss';
import Loader from '../../components/Loader/Loader';
import PlatformAvatarDropdown from '../../components/PlatformAvatarDropdown/PlatformAvatarDropdown';
import * as moment from 'moment';
import OrganizationImg from '../../assets/images/organization.png';

function PlatformOrgListView(props) {
  let history = useHistory();
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

  function onOrgClick(orgId) {
    history.push(`/org/${orgId}/overview`);
  }

  function getDateString(date) {
    console.log(date)
    let dateString = moment.unix(date).format('MMMM D, YYYY');
    return dateString.charAt(0).toUpperCase() + dateString.slice(1);
  }

  return (
    <div>
      {
        props.firstOrganizationsFetchDone &&
        <div className="Component_PlatformOrgListView">
          <div className="d-flex justify-content-between align-items-center px-4 py-3">
            <img src={appLogo} className="standard-app-logo p-1"></img>
            <PlatformAvatarDropdown />
          </div>
          <div className="container mt-5">
            { props.organizations.length > 0 && 
              <>
                <h4 className="page-title">Organizaciones</h4>
                <div className="row">
                  {props.organizations.map(organization => (
                    <div className="col-md-4 my-2" key={organization.id} onClick={() => onOrgClick(organization.id)}>
                      <div className="card clickable">
                        <div className="card-body d-flex flex-column justify-content-between">
                          <div>
                            <h5 className="card-title">{organization.name}</h5>
                            <p className="card-subtitle mb-2">{organization.subdomain}.{process.env.APP_URL}</p>
                          </div>
                          <img src={organization.imageSrc} className="organization-img"></img>
                          <p className="organization-created-at">Creado en {getDateString(organization.createdAt.seconds)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-md-4 my-2">
                    <div className="card clickable" onClick={handleCreateModalOpen}>
                      <div className="card-body d-flex flex-column text-center justify-content-center">
                        <i className="fas fa-plus create-org-icon"></i>
                        <span className="mt-4 create-org-text">Crear Organizacion</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
            { props.organizations.length < 1 && 
              <>
                <div className="offset-md-1 col-md-10">
                  <h2>Bienvenidos a Portalfox</h2>
                  <p>Una plataforma para crear to propia web interna manejada en el cloud para mejorar las comunicaciones dentro de tu empresa. Haz clic en el boton de <b>Crear Organizacion</b> para empezar.</p>
                  <button className="btn btn-primary mt-3" onClick={handleCreateModalOpen}>Create Organization</button>
                </div>
              </>
            }
            <hr className="my-5"/>
            <div className="row">
              <div className="col-md-8 my-2">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="organization-explain d-flex flex-column justify-content-between">
                        <h5 className="card-title">¿Que es una Organizacion?</h5>
                        <p className="mt-1">
                          Una Organizacion en PortalFox representa una empresa o entidad en el mundo real. Cada Organizacion contiene su propios canales, usuarios, y subdominio. Es decir, ninguna data de una organizacion puede ser accesada por usuarios de otra.
                        </p>
                        <p className="mb-0">¿Tienes mas preguntas? Chequea nuestras <a href="https://google.com">preguntas frequentes</a></p>
                      </div>
                      <img className="organization-explain-image" src={OrganizationImg}></img>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-2">
                <div className="card clickable">
                  <div className="card-body">
                    <div>
                      <h5 className="card-title">Explora este ejemplo</h5>
                      <p className="card-subtitle mb-2">ejemplo.{process.env.APP_URL}</p>
                    </div>
                    <p className="example-description">Explora este ejemplo para familiarizarte con las funciones de una organizacion de Portalfox.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ModalCreateOrganization
            showModal={showCreateModal}
            handleModalClose={handleCreateModalClose}
          />
        </div>
      }
      {
        !props.firstOrganizationsFetchDone &&
        <Loader/>
      }
    </div>
  );
}

function mapStateToProps(state){
  return {
    authenticatedUser: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    organizations: state.organizations.organizations,
    firstOrganizationsFetchDone: state.organizations.firstOrganizationsFetchDone
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOrganizations: () => dispatch(fetchOrganizations())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformOrgListView);

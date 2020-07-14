import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { setActiveOrganization } from '../../store/actions/organizations';
import Loader from '../Loader/Loader';
import fakeGraph from '../../assets/images/fake-graph.png';

function PlatformOrgOverview(props) {
  return (
    <div>
      {
        props.firstOrganizationsFetchDone &&
        <div className="container">
          <div className="row my-lg-5 my-4 p-3">
            <div className="col-lg-10 offset-lg-1">
              <div className="my-3 my-lg-5">
                <h2>{_.get(props, 'organization.name')}</h2>
                <h5>{_.get(props, 'organization.subdomain')}.portalfox.com</h5>
              </div>
              <div className="row">
                <div className="col-12 my-2">
                  <div className="card card-body">
                    <h4 className="card-title"> Users </h4>
                    <h5>Total 1,928</h5>
                    <img src={fakeGraph} style={{'width': '100%', 'maxHeight': '250px','objectFit': 'contain'}}></img>
                  </div>
                </div>
                <div className="col-lg-6 my-2">
                  <div className="card card-body">
                    <h4 className="card-title"> Channels </h4>
                    <img src={fakeGraph} style={{'width': '100%', 'maxHeight': '250px','objectFit': 'contain'}}></img>
                  </div>
                </div>
                <div className="col-lg-6 my-2">
                  <div className="card card-body">
                    <h4 className="card-title"> Articles </h4>
                    <img src={fakeGraph} style={{'width': '100%', 'maxHeight': '250px','objectFit': 'contain'}}></img>
                  </div>
                </div>
                <div className="col-lg-12 my-2">
                  <div className="card card-body">
                    <h4 className="card-title"> Other Analytics </h4>
                    <img src={fakeGraph} style={{'width': '100%', 'maxHeight': '250px','objectFit': 'contain'}}></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {
        !props.firstOrganizationsFetchDone &&
        <Loader/>
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    organization: state.organizations.activeOrganization,
    organizations: state.organizations.organizations,
    firstOrganizationsFetchDone: state.organizations.firstOrganizationsFetchDone
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveOrganization: (organization) => dispatch(setActiveOrganization(organization))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (PlatformOrgOverview);
import React, { useState } from 'react';
import * as firebase from "firebase/app";
import { connect } from 'react-redux';
import OrganizationService from '../services/firebase/organizations';
import { createOrganization } from '../store/actions/organizations';

function CreateOrganization(props) {
  const [orgInfo, setOrgInfo] = useState({
    name: '',
    subdomain: ''
  });

  function onSubmit(e) {
    e.preventDefault();
    props.createOrganization(orgInfo)
      .then((msg) => {
        alert(msg);
      })
      .catch((error) => {
        alert('there was an error: ' + error);
      });
  }

  return (
    <div>
      <h2>Create Organization</h2>
      <form onSubmit={onSubmit}> 
        <label htmlFor="name">Organization Name</label>
        <input
          type="text"
          name="name"
          value={orgInfo.name}
          onChange={e => setOrgInfo({...orgInfo, name: e.target.value})}
        ></input><br/>
        <label htmlFor="subdomain">URL</label>
        <input
          type="text"
          name="subdomain"
          value={orgInfo.subdomain}
          onChange={e => setOrgInfo({...orgInfo, subdomain: e.target.value})}
        ></input>.portalfox.com.mx<br/>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

function mapStateToProps(state){
  return {
    authenticatedUser: state.auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createOrganization: (orgInfo) => dispatch(createOrganization(orgInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrganization);

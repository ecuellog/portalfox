import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as _ from 'lodash';
import fakeLogo from '../../assets/images/fakelogo.png';
import './OrganizationNavBar.scss'

function OrganizationNavBar(props) {
  return (
    <nav className="Component_OrganizationNavBar navbar navbar-light fixed-top">
      <img className="logo" src={fakeLogo}></img>
      <a className="navbar-brand" href="#">hello</a>
    </nav>
  );
}

function mapStateToProps(state){
  return {
    channels: state.channels.channels,
    channel: state.channels.activeChannel
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveChannel: (channel) => dispatch(setActiveChannel(channel))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrganizationNavBar));

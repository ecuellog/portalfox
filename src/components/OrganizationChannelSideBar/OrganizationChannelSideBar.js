import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchChannels } from '../../store/actions/channels';
//import './OrganizationChannelSideBar.scss';
import * as _ from 'lodash';
import OrganizationChannelLink from '../OrganizationChannelLink/OrganizationChannelLink';

function OrganizationChannelSideBar(props) {
  useEffect(() => {
    if (props.organization !== null)
    props.fetchChannels();
  }, [props.organization]);

  return (
    <>
    { props.channels.map(channel => (
      <OrganizationChannelLink key={channel.id} channel={channel} />
    ))}
    <div className>
      + Add Channel
    </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    organization: state.organizations.activeOrganization,
    channels: state.channels.channels
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchChannels: () => dispatch(fetchChannels())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (OrganizationChannelSideBar);

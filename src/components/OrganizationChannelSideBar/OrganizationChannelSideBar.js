import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchChannels } from '../../store/actions/channels';
import './OrganizationChannelSideBar.scss';
import * as _ from 'lodash';
import OrganizationChannelLink from '../OrganizationChannelLink/OrganizationChannelLink';
import ModalCreateUpdateChannel from '../ModalCreateUpdateChannel/ModalCreateUpdateChannel';

function OrganizationChannelSideBar(props) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (props.organization !== null)
    props.fetchChannels();
  }, [props.organization]);

  return (
    <>
    <h4 className="p-2">Channels</h4>
    { props.channels.map(channel => (
      <OrganizationChannelLink key={channel.id} channel={channel} />
    ))}
    <div className="p-3 clickable" onClick={() => setShowCreateModal(true)}>
      + Add Channel
    </div>
    <ModalCreateUpdateChannel
      showModal={showCreateModal}
      handleModalClose={() => setShowCreateModal(false)}
      edit={false}
    />
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

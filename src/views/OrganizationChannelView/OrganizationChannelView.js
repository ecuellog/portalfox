import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import WrapperSideBar from '../../components/WrapperSideBar/WrapperSideBar';
import { setActiveChannel } from '../../store/actions/channels';
import OrganizationChannelSideBar from '../../components/OrganizationChannelSideBar/OrganizationChannelSideBar';
import * as _ from 'lodash';
import OrganizationArticleTiles from '../../components/OrganizationArticleTiles/OrganizationArticleTiles';
import OrganizationEventsTile from '../../components/OrganizationEventsTile/OrganizationEventsTile';
import './OrganizationChannelView.scss';
import { Avatar } from '@material-ui/core';
import { Dropdown } from 'react-bootstrap';
import OrganizationTopBar from '../../components/OrganizationTopBar/OrganizationTopBar';

function OrganizationChannelView(props) {
  const [channelId, setChannelId] = useState(null);

  useEffect(() => {
    setChannelId(props.match.params.channelId);
  }, [props.match.params.channelId]);

  useEffect(() => {
    if (channelId !== 'all') {
      let queryChannel = props.channels.find(
        channel => channel.id === channelId
      );
      props.setActiveChannel(queryChannel);
    }
  }, [props.channels, channelId]);

  const AvatarDropdownToggle = React.forwardRef((props, ref) => (
    <Avatar
      alt={props.user.displayName}
      src={props.user.photoURL}
      className="clickable avatar-colors green"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        props.onClick(e);
      }}
    >
      E
    </Avatar>
  ));

  return (
    <div className="Component_OrganizationChannelView">
      <WrapperSideBar sidebar={<OrganizationChannelSideBar />} navbar={false}>
        <div className="constraint-width container-fluid px-5">
          <OrganizationTopBar />
          <div className="row no-gutters">
            <div className="col-lg-8 pr-3">
              <OrganizationArticleTiles channelId={channelId} />
            </div>
            <div className="col-lg-4 pl-4">
              <OrganizationEventsTile titleTodoChangeThis="Eventos" />
              <OrganizationEventsTile titleTodoChangeThis="Celebraciones" />
            </div>
          </div>
        </div>
      </WrapperSideBar>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    channels: state.channels.channels,
    channel: state.channels.activeChannel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveChannel: channel => dispatch(setActiveChannel(channel))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrganizationChannelView)
);

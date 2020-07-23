import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WrapperSideBar from '../../components/WrapperSideBar/WrapperSideBar';
import { setActiveChannel } from '../../store/actions/channels';
import OrganizationChannelSideBar from '../../components/OrganizationChannelSideBar/OrganizationChannelSideBar';
import * as _ from 'lodash';
import OrganizationArticleTiles from '../../components/OrganizationArticleTiles/OrganizationArticleTiles';

function OrganizationChannelView(props) {
  const [channelId, setChannelId] = useState(null);

  useEffect(() => {
    setChannelId(props.match.params.channelId);
  }, [props.match.params.channelId]);
  
  useEffect(() => {
    if (channelId !== 'all') {
      let queryChannel = props.channels.find(channel => channel.id === channelId);
      props.setActiveChannel(queryChannel);
    }
  }, [props.channels, channelId]);

  return (
    <WrapperSideBar sidebar={<OrganizationChannelSideBar/>}>
      <div className="container-fluid p-4">
        { channelId !== 'all' &&
          <>
            <h2>{_.get(props.channel, 'name')}</h2>
            <h6>{_.get(props.channel, 'description')}</h6>
          </>
        } 
        { channelId == 'all' && 
          <h2>All Channels</h2>
        }
        <hr/>
        <div className="row no-gutters">
          <div className="col-lg-8">
            <OrganizationArticleTiles channelId={channelId}/>
          </div>
          <div className="col-lg-4">
            asdf 
          </div>
        </div>
      </div>
    </WrapperSideBar>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrganizationChannelView));

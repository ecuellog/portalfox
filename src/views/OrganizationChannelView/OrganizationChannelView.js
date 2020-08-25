import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import WrapperSideBar from "../../components/WrapperSideBar/WrapperSideBar";
import { setActiveChannel } from "../../store/actions/channels";
import OrganizationChannelSideBar from "../../components/OrganizationChannelSideBar/OrganizationChannelSideBar";
import OrganizationNavBar from "../../components/OrganizationNavBar/OrganizationNavBar";
import * as _ from "lodash";
import OrganizationArticleTiles from "../../components/OrganizationArticleTiles/OrganizationArticleTiles";
import OrganizationEventsTile from "../../components/OrganizationEventsTile/OrganizationEventsTile";
import "./OrganizationChannelView.scss";

function OrganizationChannelView(props) {
  const [channelId, setChannelId] = useState(null);

  useEffect(() => {
    setChannelId(props.match.params.channelId);
  }, [props.match.params.channelId]);

  useEffect(() => {
    if (channelId !== "all") {
      let queryChannel = props.channels.find(
        channel => channel.id === channelId
      );
      props.setActiveChannel(queryChannel);
    }
  }, [props.channels, channelId]);

  return (
    <div className="Component_OrganizationChannelView">
      <WrapperSideBar sidebar={<OrganizationChannelSideBar />} navbar={false}>
        <div className="constraint-width container-fluid p-5">
          <div className="row no-gutters">
            <div className="col-lg-8">
              <OrganizationArticleTiles channelId={channelId} />
            </div>
            <div className="col-lg-4 pl-3">
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

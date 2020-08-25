import React, { useEffect, useState } from "react";
import { NavLink, useLocation, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchChannels } from "../../store/actions/channels";
import "./OrganizationChannelSideBar.scss";
import * as _ from "lodash";
import OrganizationChannelLink from "../OrganizationChannelLink/OrganizationChannelLink";
import ModalCreateUpdateChannel from "../ModalCreateUpdateChannel/ModalCreateUpdateChannel";

function OrganizationChannelSideBar(props) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (props.organization !== null) props.fetchChannels();
  }, [props.organization]);

  return (
    <div className="Component_OrganizationChannelSideBar">
      {_.get(props, "organization.imageSrc") ? (
        <img className="logo" src={props.organization.imageSrc}></img>
      ) : (
        <h2 className="logo mb-0">{_.get(props, "organization.name")}</h2>
      )}
      <hr />
      <NavLink
        className="link mb-3"
        activeClassName="active"
        to="/channels/all"
      >
        <i className="sidebar-icon pf-icon-keypad"></i>
        <span>Todos</span>
      </NavLink>
      {props.channels.map(channel => (
        <OrganizationChannelLink key={channel.id} channel={channel} />
      ))}
      <div
        className="btn btn-primary mt-4 w-100"
        onClick={() => setShowCreateModal(true)}
      >
        + Nuevo Canal
      </div>
      <ModalCreateUpdateChannel
        showModal={showCreateModal}
        handleModalClose={() => setShowCreateModal(false)}
        edit={false}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    organization: state.organizations.activeOrganization,
    channels: state.channels.channels
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchChannels: () => dispatch(fetchChannels())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationChannelSideBar);

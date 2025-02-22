import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink, useLocation, Redirect } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import ModalCreateUpdateChannel from "../ModalCreateUpdateChannel/ModalCreateUpdateChannel";
import ModalDeleteChannel from "../ModalDeleteChannel/ModalDeleteChannel";
import "./OrganizationChannelLink.scss";

function OrganizationChannelLink(props) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  let history = useHistory();

  function handleUpdateModalClose() {
    setShowUpdateModal(false);
  }

  function handleDeleteModalClose() {
    setShowDeleteModal(false);
  }

  function handleEditClick(e) {
    e.preventDefault();
    setShowUpdateModal(true);
  }

  function handleDeleteClick(e) {
    e.preventDefault();
    setShowDeleteModal(true);
  }

  function onToggleDropdown(isOpen, e) {
    if (e) e.preventDefault();
    setShowDropdown(isOpen);
  }

  function onClickCreateArticle() {
    history.push(`/channels/${props.channel.id}/articles/new`);
  }

  return (
    <div className="Component_OrganizationChannelLink">
      <NavLink
        className="link my-3"
        key={props.channel.id}
        activeClassName="active"
        to={`/channels/${props.channel.id}`}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <i className="pf-icon-hash sidebar-icon"></i>
        <span>{props.channel.name}</span>
        <div className="ml-auto">
          <Dropdown alignRight show={showDropdown} onToggle={onToggleDropdown}>
            <Dropdown.Toggle
              as="i"
              className="dropmenu-icon fas fa-ellipsis-v"
            ></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="div" onClick={onClickCreateArticle}>
                <i className="dropdown-icon fas fa-pen-fancy"></i>
                <span className="ml-4">Create Article</span>
              </Dropdown.Item>
              <Dropdown.Item as="div" onClick={handleEditClick}>
                <i className="dropdown-icon far fa-edit"></i>
                <span className="ml-4">Edit Channel</span>
              </Dropdown.Item>
              <Dropdown.Item as="div" onClick={handleDeleteClick}>
                <i className="dropdown-icon far fa-trash-alt"></i>
                <span className="ml-4">Delete Channel</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </NavLink>
      <ModalCreateUpdateChannel
        showModal={showUpdateModal}
        handleModalClose={handleUpdateModalClose}
        edit={true}
        channel={props.channel}
      />
      <ModalDeleteChannel
        showModal={showDeleteModal}
        handleModalClose={handleDeleteModalClose}
        channel={props.channel}
      />
    </div>
  );
}

export default OrganizationChannelLink;

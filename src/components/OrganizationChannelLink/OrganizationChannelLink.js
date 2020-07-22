import React, { useState } from 'react';
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import ModalCreateUpdateChannel from '../ModalCreateUpdateChannel/ModalCreateUpdateChannel';
import ModalDeleteChannel from '../ModalDeleteChannel/ModalDeleteChannel';
import './OrganizationChannelLink.scss';

function OrganizationChannelLink(props) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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

  return (
    <div className="Component_OrganizationChannelLink">
      <NavLink
        className="link"
        key={props.channel.id}
        activeClassName="active"
        to={`/channels/${props.channel.id}`}
        onMouseLeave={() => setShowDropdown(false)}
      >
        # {props.channel.name}
        <div>
          <Dropdown alignRight show={showDropdown} onToggle={onToggleDropdown}>
            <Dropdown.Toggle
              as="i"
              className="dropmenu-icon fas fa-ellipsis-v"
            >
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="div" onClick={handleEditClick}>
                <i className="far fa-edit position-absolute"></i>
                <span className="ml-4">Edit</span>
              </Dropdown.Item>
              <Dropdown.Item as="div" onClick={handleDeleteClick}>
                <i className="far fa-trash-alt position-absolute"></i>
                <span className="ml-4">Delete</span>
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
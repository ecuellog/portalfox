import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { fetchChannels } from '../../store/actions/channels';
import Loader from '../Loader/Loader';
import './PlatformOrgChannels.scss';
import ModalCreateUpdateChannel from '../ModalCreateUpdateChannel/ModalCreateUpdateChannel';
import ModalDeleteChannel from '../ModalDeleteChannel/ModalDeleteChannel';
import { Dropdown } from 'react-bootstrap';

function PlatformOrgChannels(props) {
  const [loading, setLoading] = useState(true);
  const [showCreateUpdateModal, setShowCreateUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editChannel, setEditChannel] = useState(false);
  const [channel, setChannel] = useState(null);

  function handleCreateUpdateModalClose() {
    setShowCreateUpdateModal(false);
  }

  function handleDeleteModalClose() {
    setShowDeleteModal(false);
  }

  function handleCreateClick() {
    setEditChannel(false);
    setChannel(null);
    setShowCreateUpdateModal(true);
  }

  function handleEditClick(channel) {
    setEditChannel(true);
    setChannel(channel);
    setShowCreateUpdateModal(true);
  }

  function handleDeleteClick(channel) {
    setChannel(channel);
    setShowDeleteModal(true);
  }

  useEffect(() => {
    setLoading(true);

    if (props.organization) {
      props.fetchChannels()
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props.organization]);

  return (
    <div className="Component_PlatformOrgChannels p-4">
      <h2 className="mt-3">Channels</h2>
      <hr/>
      {
        loading && 
        <Loader/>
      }
      {
        !loading &&
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="row my-3">
              <div className="col-12">
                <div className="card card-body">
                  {
                    !props.channels.length &&
                    <div>
                      No channels, create a new one  below  
                    </div>
                  }
                  {
                    !!props.channels.length && 
                    <table className="table table-hover">
                      <thead>
                        <tr className="d-flex">
                          <th className="col-3">Name</th>
                          <th className="col-8">Description</th>
                          <th className="col-1"></th>
                        </tr>
                      </thead>
                      <tbody>
                        { props.channels.map((channel) => (
                          <tr key={channel.id} className="d-flex">
                            <td className="col-3 py-3">{channel.name}</td>
                            <td className="col-8 py-3">{channel.description}</td>
                            <td className="col-1 py-3">
                              <Dropdown alignRight>
                                <Dropdown.Toggle
                                  as="i"
                                  className="dropmenu-icon fas fa-ellipsis-v"
                                >
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={() => handleEditClick(channel)}>
                                    <i className="far fa-edit position-absolute"></i>
                                    <span className="ml-4">Edit</span>
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleDeleteClick(channel)}>
                                    <i className="far fa-trash-alt position-absolute"></i>
                                    <span className="ml-4">Delete</span>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  }
                  <div className="d-flex justify-content-end mt-4">
                    <button className="btn btn-primary" onClick={handleCreateClick}>Create Channel</button>
                  </div>
                  <ModalCreateUpdateChannel
                    showModal={showCreateUpdateModal}
                    handleModalClose={handleCreateUpdateModalClose}
                    edit={editChannel}
                    channel={channel}
                  />
                  <ModalDeleteChannel
                    showModal={showDeleteModal}
                    handleModalClose={handleDeleteModalClose}
                    channel={channel}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    channels: state.channels.channels,
    organization: state.organizations.activeOrganization
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchChannels: () => dispatch(fetchChannels())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (PlatformOrgChannels);

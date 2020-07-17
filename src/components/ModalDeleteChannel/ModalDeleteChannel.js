import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deleteChannel } from '../../store/actions/channels';
import { Modal } from 'react-bootstrap';
import * as _ from 'lodash';

function ModalDeleteChannel(props) {

  function onDelete() {
    props.deleteChannel(props.channel.id)
      .then((msg) => {
        alert(msg);
        props.handleModalClose();
      })
      .catch((error) => {
        alert(error);
      });
  }
 
  function onCancel() {
    props.handleModalClose();
  }

  return (
    <Modal size="md" show={props.showModal} onHide={onCancel}>
      <Modal.Body>
        <div>
        <h2 className="mb-5">Delete Channel</h2>
        <div>Are you sure you want to delete the <b>{_.get(props.channel, 'name')}</b> channel?</div>
        <div className="d-flex justify-content-center mt-5">
          <button className="btn btn-blank mr-2" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger ml-2" onClick={onDelete}>Delete</button>
        </div>
        </div>
      </Modal.Body>  
    </Modal>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    deleteChannel: (channelId) => dispatch(deleteChannel(channelId)),
  }
}

export default connect(null, mapDispatchToProps) (ModalDeleteChannel);

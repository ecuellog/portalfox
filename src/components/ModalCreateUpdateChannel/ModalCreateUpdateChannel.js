import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { createChannel, updateChannel } from '../../store/actions/channels';
import { Modal } from 'react-bootstrap';

function ModalCreateUpdateChannel(props) {
  const defaultChannelInfo = {
    name: '',
    description: ''
  }

  const [channelInfo, setChannelInfo] = useState(defaultChannelInfo);
  const [channelId, setChannelId] = useState(null);

  useEffect(() => {
    if (props.channel) {
      let { id, ...cInfo } = props.channel;
      setChannelInfo(cInfo);
      setChannelId(id);
    } else {
      resetForm();
    }
  }, [props.channel]);

  function onSubmit(e) {
    e.preventDefault();

    let promise;
    if(props.edit) {
      promise = props.updateChannel(channelId, channelInfo);
    } else {
      promise = props.createChannel(channelInfo)
    }

    promise
      .then((msg) => {
        alert(msg);
        resetForm();
        props.handleModalClose();
      })
      .catch((error) => {
        alert(error);
      });
  }

  function onCancel(e) {
    if(e) e.preventDefault();
    resetForm();
    props.handleModalClose();
  }

  function resetForm() {
    setChannelInfo(defaultChannelInfo);
    setChannelId(null);
  }

  return (
    <Modal size="lg" show={props.showModal} onHide={onCancel}>
      <Modal.Body>
        <div>
        <h2 className="mb-5">{props.edit ? 'Edit': 'Create'} Channel</h2>
          <form className="Component_ModalCreateChannel" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="text"
                value={channelInfo.name}
                placeholder="name"
                onChange={e => setChannelInfo({...channelInfo, name: e.target.value})}
              >
              </input>
            </div>
            <div className="form-group">
              <label htmlFor="name">Description</label>
              <textarea
                className="form-control"
                value={channelInfo.description}
                placeholder="description"
                onChange={e => setChannelInfo({...channelInfo, description: e.target.value})}
              >
              </textarea>
            </div>
            <div className="d-flex justify-content-center mt-5">
              <button className="btn btn-blank mr-2" type="button" onClick={onCancel}>Cancel</button>
              <button className="btn btn-primary ml-2" type="submit">{props.edit ? 'Update': 'Create'}</button>
            </div>
          </form>
        </div>
      </Modal.Body>  
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createChannel: (channelInfo) => dispatch(createChannel(channelInfo)),
    updateChannel: (channelId, channelInfo) => dispatch(updateChannel(channelId, channelInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ModalCreateUpdateChannel);

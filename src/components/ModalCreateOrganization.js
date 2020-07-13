import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createOrganization } from '../store/actions/organizations';
import { Modal } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from './ValidationHOCs/Input';
import { required, subdomain } from '../common/validators';
import * as _ from 'lodash';

function ModalCreateOrganization(props) {
  const defaultOrgInfo = {
    name: '',
    subdomain: ''
  }
  const [orgInfo, setOrgInfo] = useState(defaultOrgInfo);
  const [errors, setErrors] = useState(defaultOrgInfo);

  function onSubmit(e) {
    e.preventDefault();
    props.createOrganization(orgInfo)
      .then((msg) => {
        alert(msg);
        setOrgInfo(defaultOrgInfo);
        setErrors(defaultOrgInfo);
        props.handleModalClose();
      })
      .catch((error) => {
        alert(error);
      });
  }

  function onCancel(e) {
    e.preventDefault();
    setOrgInfo(defaultOrgInfo);
    setErrors(defaultOrgInfo);
    props.handleModalClose();
  }

  return (
    <Modal size="lg" show={props.showModal} onHide={props.handleModalClose}>
      <Modal.Body>
        <div>
          <h2 className="mb-5">Create Organization</h2>
          <Form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Organization Name</label>
              <Input
                className="form-control"
                placeholder="Your Organization Inc."
                type="text"
                name="name"
                value={orgInfo.name}
                onChange={e => setOrgInfo({...orgInfo, name: e.target.value})}
                validations={[required]}
                onErrorChange={(err) => setErrors({...errors, name: err})}
              ></Input>
              <p className="validation-error">
                {errors.name}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="subdomain">Subdomain</label>
              <div className="input-group">
                <Input
                  className="form-control"
                  placeholder="yourorganization"
                  type="text"
                  name="subdomain"
                  value={orgInfo.subdomain}
                  onChange={e => setOrgInfo({...orgInfo, subdomain: e.target.value})}
                  validations={[required, subdomain]}
                  onErrorChange={(err) => setErrors({...errors, subdomain: err})}
                ></Input>
                <div className="input-group-append">
                  <span className="input-group-text">.portalfox.com</span>
                </div>
              </div>
              <p className="validation-error">
                {errors.subdomain}
              </p>
              <small className="form-text text-muted ml-1">
                A subdomain can have:
                <ul>
                  <li>Lowercase letters,</li>
                  <li>Numbers, and</li>
                  <li>Hyphens</li>
                </ul>
              </small>
            </div>
            <div className="d-flex justify-content-center mt-5">
              <button className="btn btn-blank mr-2" type="button" onClick={onCancel}>Cancel</button>
              <button className="btn btn-primary ml-2" type="submit">Create</button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function mapStateToProps(state){
  return {
    authenticatedUser: state.auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createOrganization: (orgInfo) => dispatch(createOrganization(orgInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateOrganization);

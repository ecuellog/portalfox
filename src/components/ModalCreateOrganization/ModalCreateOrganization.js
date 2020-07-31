import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createOrganization } from '../../store/actions/organizations';
import { Modal } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from '../ValidationHOCs/Input';
import { required, subdomain } from '../../common/validators';
import * as _ from 'lodash';
import ImageDropzone from '../ImageDropzone/ImageDropzone';
import './ModalCreateOrganization.scss';
import { v4 as uuidv4 } from 'uuid';
import * as firebase from "firebase/app";

function ModalCreateOrganization(props) {
  const defaultOrgInfo = {
    name: '',
    subdomain: ''
  }
  const [orgInfo, setOrgInfo] = useState(defaultOrgInfo);
  const [errors, setErrors] = useState(defaultOrgInfo);
  const [logoImage, setLogoImage] = useState(null);
  const [logoBinary, setLogoBinary] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    let imageId = uuidv4();
    let storageRef = firebase.storage().ref();
    let articleImgsRef = storageRef.child(`orgLogos/${imageId}`);

    articleImgsRef.put(logoImage).then((snapshot) => {
      articleImgsRef.getDownloadURL().then((url) => {
        props.createOrganization({...orgInfo, imageSrc: url})
          .then((msg) => {
            alert(msg);
            setOrgInfo(defaultOrgInfo);
            setErrors(defaultOrgInfo);
            props.handleModalClose();
          })
          .catch((error) => {
            alert(error);
          });
      });
    });
  }

  function onCancel(e) {
    e.preventDefault();
    setOrgInfo(defaultOrgInfo);
    setErrors(defaultOrgInfo);
    setLogoBinary(null);
    setLogoImage(null);
    props.handleModalClose();
  }

  function onDrop(file) {
    const reader = new FileReader();

    reader.onerror = () => alert('There was an error reading the file.');
    reader.onload = () => {
      const binResult = reader.result;
      setLogoBinary(binResult);
      setLogoImage(file);
    };
    
    reader.readAsBinaryString(file);
  }

  function resetImage() {
    setLogoImage(null);
    setLogoBinary(null);
  }

  return (
    <Modal
      className="Component_ModalCreateOrganization"
      size="lg"
      show={props.showModal}
      onHide={props.handleModalClose}
    >
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
            <div className="form-group">
              <label>Logo</label>
              { logoImage !== null &&
                <a href="#" onClick={resetImage} className="ml-3">reset</a>
              }
              { logoImage === null && 
                <ImageDropzone className="img-drop mb-3" onDrop={onDrop}/>
              }
              { logoImage !== null &&
                <nav className="navbar navbar-light mb-3">
                  <img src={`data:image/*;base64,${btoa(logoBinary)}`} className="logo-img"></img>
                </nav>
              }
              <small className="form-text text-muted ml-1">
                * Your logo will appear in your organization's navigation bar. If no image is uploaded, your organization's name will appear instead.
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

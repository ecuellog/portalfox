import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OrganizationArticleNewView.scss';
import { createArticle, resetNewArticle, setNewArticle } from '../../store/actions/articles';
import WrapperJoditEditor from '../../components/WrapperJoditEditor/WrapperJoditEditor';
import ImageDropzone from '../../components/ImageDropzone/ImageDropzone';
import { v4 as uuidv4 } from 'uuid';
import * as firebase from 'firebase/app';
import WrapperSideBar from '../../components/WrapperSideBar/WrapperSideBar';
import OrganizationArticleNewSideBar from '../../components/OrganizationArticleNewSideBar/OrganizationArticleNewSideBar';
import OrganizationTopBar from '../../components/OrganizationTopBar/OrganizationTopBar';

function OrganizationArticleNewView(props) {
  let history = useHistory();
  const [joditRenderTrigger, setJoditRenderTrigger] = useState(false);

  function goBack() {
    props.resetNewArticle();
    history.goBack();
  }

  function onSubmit(e) {
    e.preventDefault();
    let channelId = props.match.params.channelId;
    let imageId = uuidv4();

    let storageRef = firebase.storage().ref();
    let articleImgsRef = storageRef.child(`articleImages/${imageId}`);

    articleImgsRef.put(props.newArticle.mainImage).then(snapshot => {
      articleImgsRef.getDownloadURL().then(url => {
        props
          .createArticle(channelId, {
            title: props.newArticle.title,
            summary: props.newArticle.summary,
            content: props.newArticle.content,
            imageSrc: url
          })
          .then(message => {
            alert(message);
            props.resetNewArticle();
            goBack();
          })
          .catch(error => {
            alert(error);
          });
      });
    });
  }

  function setArticleProp(propName, propValue) {
    props.setNewArticle({
      ...props.newArticle,
      [propName]: propValue
    })
  }

  function triggerJoditRerender() {
    setJoditRenderTrigger(!joditRenderTrigger);
  }

  function onDrop(file) {
    const reader = new FileReader();

    reader.onerror = () => alert('There was an error reading the file.');
    reader.onload = () => {
      const binResult = reader.result;
      props.setNewArticle({
        ...props.newArticle,
        mainImage: file,
        imageBinary: binResult
      });
      triggerJoditRerender();
    };

    reader.readAsBinaryString(file);
  }

  function resetImage() {
    props.setNewArticle({
      ...props.newArticle,
      mainImage: null,
      imageBinary: null
    });
  }

  return (
    <div className="Component_OrganizationArticleNewView">
      <WrapperSideBar sidebar={<OrganizationArticleNewSideBar />} navbar={false}>
        <div className="constraint-width container-fluid px-5 pb-1">
          <OrganizationTopBar search={false}/>
          <h1 className="mb-4 text-center">Nuevo Articulo</h1>
          <label>Imagen Principal</label>
          {props.newArticle.mainImage === null && (
            <ImageDropzone className="mb-4" onDrop={onDrop} />
          )}
          {props.newArticle.mainImage !== null && (
            <div className="container-main-img position-relative">
              <i className="delete-icon fa fa-times" onClick={resetImage}></i>
              <img
                src={`data:image/*;base64,${btoa(props.newArticle.imageBinary)}`}
                className="main-img mb-4"
              ></img>
            </div>
          )}
          <form onSubmit={onSubmit}>
            <label htmlFor="title">Titulo</label>
            <input
              type="text"
              name="title"
              className="form-control title-input"
              value={props.newArticle.title}
              onChange={e => setArticleProp('title', e.target.value)}
              onBlur={triggerJoditRerender}
            ></input>
            <label htmlFor="summary" className="mt-4">
              Descripcion
            </label>
            <textarea
              name="summary"
              className="form-control"
              value={props.newArticle.summary}
              onChange={e => setArticleProp('summary', e.target.value)}
              onBlur={triggerJoditRerender}
            ></textarea>
            <label className="mt-4">Contenido</label>
            <WrapperJoditEditor
              value={props.newArticle.content}
              onBlur={e => setArticleProp('content', e.target.innerHTML)}
              tabIndex={4}
              renderTrigger={joditRenderTrigger}
            />
            <div className="d-flex justify-content-center mt-5">
              <button className="btn btn-blank" type="button" onClick={goBack}>
                Cancelar
              </button>
              <button className="btn btn-primary"> Publicar </button>
            </div>
          </form>
        </div>
      </WrapperSideBar>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    newArticle: state.articles.newArticle
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createArticle: (channelId, articleInfo) => dispatch(createArticle(channelId, articleInfo)),
    setNewArticle: (article) => dispatch(setNewArticle(article)),
    resetNewArticle: () => dispatch(resetNewArticle())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrganizationArticleNewView));

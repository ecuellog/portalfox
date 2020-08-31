import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OrganizationArticleNewForm.scss';
import { setNewArticle } from '../../store/actions/articles';
import WrapperJoditEditor from '../../components/WrapperJoditEditor/WrapperJoditEditor';
import ImageDropzone from '../../components/ImageDropzone/ImageDropzone';

function OrganizationArticleNewForm(props) {
  const [joditRenderTrigger, setJoditRenderTrigger] = useState(false);

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
    <div className="Component_OrganizationArticleNewForm">
      <label>Imagen Principal</label>
      {props.newArticle.mainImage === null && (
        <ImageDropzone className="mb-4" onDrop={onDrop} />
      )}
      {props.newArticle.mainImage !== null && (
        <div className="container-article-img position-relative mb-4">
          <i className="delete-icon fa fa-times" onClick={resetImage}></i>
          <img
            src={`data:image/*;base64,${btoa(props.newArticle.imageBinary)}`}
            className="article-img"
          ></img>
        </div>
      )}
      <form>
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          name="title"
          className="form-control title-input"
          value={props.newArticle.title}
          onChange={e => setArticleProp('title', e.target.value)}
          onBlur={triggerJoditRerender}
          tabIndex={1}
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
          tabIndex={2}
        ></textarea>
        <label className="mt-4">Contenido</label>
        <WrapperJoditEditor
          value={props.newArticle.content}
          onBlur={e => setArticleProp('content', e.target.innerHTML)}
          tabIndex={3}
          renderTrigger={joditRenderTrigger}
        />
      </form>
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
    setNewArticle: (article) => dispatch(setNewArticle(article)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrganizationArticleNewForm));

import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OrganizationArticleNewView.scss';
import { createArticle, resetNewArticle, setNewArticle } from '../../store/actions/articles';
import { v4 as uuidv4 } from 'uuid';
import * as firebase from 'firebase/app';
import WrapperSideBar from '../../components/WrapperSideBar/WrapperSideBar';
import OrganizationArticleNewSideBar from '../../components/OrganizationArticleNewSideBar/OrganizationArticleNewSideBar';
import OrganizationTopBar from '../../components/OrganizationTopBar/OrganizationTopBar';
import OrganizationArticleNewForm from '../../components/OrganizationArticleNewForm/OrganizationArticleNewForm';
import OrganizationArticle from '../../components/OrganizationArticle/OrganizationArticle';

function OrganizationArticleNewView(props) {
  let history = useHistory();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    let tabName = new URLSearchParams(props.location.search).get('tab');
    setActiveTab(tabName);
  }, [props.location.search]);

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

  return (
    <div className="Component_OrganizationArticleNewView">
      <WrapperSideBar sidebar={<OrganizationArticleNewSideBar />} navbar={false}>
        <div className="constraint-width container-fluid px-5 pb-5">
          <OrganizationTopBar search={false}/>
          <div className="px-lg-6">
            {
              !activeTab && (
                <>
                  <h1 className="mb-4 text-center">Nuevo Articulo</h1>
                  <OrganizationArticleNewForm />
                </>
              )
            }
            {
              activeTab === 'preview' &&
              <OrganizationArticle new />
            }
            <div className="d-flex justify-content-center mt-5">
              <button className="btn btn-blank" type="button" onClick={goBack}>
                Cancelar
              </button>
              <button className="btn btn-primary" type="button" onClick={onSubmit}> Publicar </button>
            </div>
          </div>
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

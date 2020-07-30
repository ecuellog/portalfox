import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OrganizationArticleView.scss';
import { fetchArticle, setActiveArticle } from '../../store/actions/articles';
import Loader from '../../components/Loader/Loader';
import DOMPurify from 'dompurify';
import OrganizationNavBar from '../../components/OrganizationNavBar/OrganizationNavBar';

function OrganizationArticleView (props) {
  let history = useHistory();
  const [channelId, setChannelId] = useState(null);
  const [articleId, setArticleId] = useState(null);

  useEffect(() => {
    setChannelId(props.match.params.channelId);
  }, [props.match.params.channelId]);

  useEffect(() => {
    setArticleId(props.match.params.articleId);
  }, [props.match.params.articleId]);

  useEffect(() => {
    if (articleId && props.organization) {
      let queryArticle = props.articles.find(article => article.id === articleId);
      if (queryArticle) {
        props.setActiveArticle(queryArticle);
      } else {
        props.fetchArticle(channelId, articleId);
      }
    }
  }, [articleId, props.organization]);

  function goBack() {
    history.goBack();
  }

	return (
    <div className="Component_OrganizationArticleView">
      <OrganizationNavBar/>
      <div>
        { props.article !== null && 
          <div className="container py-4">
            <button className="btn btn-blank btn-back" onClick={goBack}>
              <i className="fas fa-chevron-left"></i>
              Back
            </button>
            <h1 className="mt-5 mb-3 text-center">{props.article.title}</h1>
            <div className="container-main-img">
              <img src={props.article.imageSrc} className="main-img mb-4"></img>
            </div>
            <div
              className="mt-5"
              dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.article.content)}}
            ></div>
          </div>
        }
        { props.article === null && 
          <Loader/>
        }
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveArticle: (article) => dispatch(setActiveArticle(article)),
    fetchArticle: (channelId, articleId) => dispatch(fetchArticle(channelId, articleId))
  }
}

function mapStateToProps(state) {
  return {
    article: state.articles.activeArticle,
    articles: state.articles.articles,
    organization: state.organizations.activeOrganization
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrganizationArticleView));

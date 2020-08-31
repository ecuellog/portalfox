import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OrganizationArticle.scss';
import { fetchArticle, setActiveArticle } from '../../store/actions/articles';
import Loader from '../../components/Loader/Loader';
import DOMPurify from 'dompurify';
import * as moment from 'moment';

function OrganizationArticle (props) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    console.log(props)
    if (props.new) {
      setArticle(props.newArticle);
    } else {
      setArticle(props.activeArticle);
    }
  }, [props.new, props.newArticle, props.activeArticle]);

  function getTodayDate() {
    let today = moment().format('MMMM D, YYYY');
    return today.charAt(0).toUpperCase() + today.slice(1);
  }

  return (
    <div className="Component_OrganizationArticle">
      { article !== null && 
        <div className="container py-2">
          { props.new && article.imageBinary &&
            <div className="container-article-img mb-4">
              <img
                src={`data:image/*;base64,${btoa(article.imageBinary)}`} className="article-img"
              ></img>
            </div>
          }
          { !props.new && article.imageSrc &&
            <div className="container-article-img mb-4">
              <img src={article.imageSrc} className="article-img"></img>
            </div>
          }
          <h1 className="mt-3 mb-0">{article.title || '(Sin Titulo)'}</h1>
          <p>
            <span className="article-date">{getTodayDate()}</span>
          </p>
          {
            article.content ? (
              <div
                className="mt-5"
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(article.content)}}
              ></div>
            ) : (
              <div
                className="mt-5"
              >(Sin contenido)</div>
            )
          }
        </div>
      }
      { article === null &&
        <Loader/>
      }
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
    newArticle: state.articles.newArticle,
    activeArticle: state.articles.activeArticle
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrganizationArticle));

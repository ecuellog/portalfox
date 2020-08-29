import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OrganizationArticleView.scss';
import { fetchArticle, setActiveArticle } from '../../store/actions/articles';
import OrganizationArticle from '../../components/OrganizationArticle/OrganizationArticle';
import WrapperSideBar from '../../components/WrapperSideBar/WrapperSideBar';
import OrganizationArticleSideBar from '../../components/OrganizationArticleSideBar/OrganizationArticleSideBar';
import OrganizationTopBar from '../../components/OrganizationTopBar/OrganizationTopBar';

function OrganizationArticleView (props) {
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

	return (
    <div className="Component_OrganizationArticleView">
      <WrapperSideBar sidebar={<OrganizationArticleSideBar />} navbar={false}>
        <div className="constraint-width container-fluid px-5 pb-5">
          <OrganizationTopBar search={false}/>
          <div className="px-lg-6">
            <OrganizationArticle />
          </div>
        </div>
      </WrapperSideBar>
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

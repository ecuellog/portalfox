import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchChannelArticles, fetchAllArticles } from '../../store/actions/articles';
import * as _ from 'lodash';
import blogImg from '../../assets/images/blogimgsample.jpg';
import './OrganizationArticleTiles.scss';

function OrganizationArticleTiles(props) {
  useEffect(() => {
    if (!props.channelId || props.organization === null) return;

    let promise;
    if (props.channelId !== 'all') {
      promise = props.fetchChannelArticles(props.channelId);
    } else {
      promise = props.fetchAllArticles();
    }

    promise.catch((error) => {
      console.log(error);
      alert('There was an error fetching articles.');
    })

  }, [props.channelId, props.organization]);

  return (
    <div className="Component_OrganizationArticleTiles">
      { props.articles.map((article) => 
        <div key={article.id} className="card card-body d-flex flex-row">
          <div className="img-container">
            <img src={blogImg}></img>
          </div>
          <div className="mx-5">
            <h1 className="my-3">{article.title}</h1>
            <p className="my-3">{article.subtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state){
  return {
    organization: state.organizations.activeOrganization,
    articles: state.articles.articles
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchChannelArticles: (channel) => dispatch(fetchChannelArticles(channel)),
    fetchAllArticles: () => dispatch(fetchAllArticles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationArticleTiles);
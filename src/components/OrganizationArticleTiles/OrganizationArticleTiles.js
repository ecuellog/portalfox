import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchChannelArticles, fetchAllArticles } from '../../store/actions/articles';
import * as _ from 'lodash';
import './OrganizationArticleTiles.scss';
import OrganizationArticleTileHorizontal from '../OrganizationArticleTileHorizontal/OrganizationArticleTileHorizontal';
import OrganizationArticleTileVertical from '../OrganizationArticleTileVertical/OrganizationArticleTileVertical';

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
      { props.articles.length > 0 && 
        <OrganizationArticleTileHorizontal article={props.articles[0]} />
      }
      <div className="row no-gutters">
        <div className="col-md-6 pr-2">
          { props.articles.slice(1).filter((article, index) => index % 2 === 0).map((article) => 
            <div key={article.id}>
              <OrganizationArticleTileVertical article={article} />
            </div>
          )}
        </div>
        <div className="col-md-6 pl-2">
          { props.articles.slice(1).filter((article, index) => index % 2 !== 0).map((article) => 
            <div key={article.id}>
              <OrganizationArticleTileVertical article={article} />
            </div>
          )}
        </div>
      </div>
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

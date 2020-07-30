import React from 'react';
import './OrganizationArticleTileHorizontal.scss';
import { useHistory } from 'react-router-dom';

function OrganizationArticleTileHorizontal(props) {
  let history = useHistory();

  function onTileClick() {
    history.push(`/channels/${props.article.channelId}/articles/${props.article.id}`);
  }
  
  return (
    <div 
      className="Component_OrganizationArticleTileHorizontal card card-body d-flex flex-row clickable"
      onClick={onTileClick}
    >
      <div className="img-container">
        <img src={props.article.imageSrc}></img>
      </div>
      <div className="px-5 w-50">
        <h2 className="my-3">{props.article.title}</h2>
        <p className="my-3">{props.article.summary}</p>
      </div>
    </div>
  );
}

export default OrganizationArticleTileHorizontal;

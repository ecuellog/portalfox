import React from 'react';
import './OrganizationArticleTileVertical.scss';
import { useHistory } from 'react-router-dom';

function OrganizationArticleTileVertical(props) {
  let history = useHistory();

  function onTileClick() {
    history.push(`/channels/${props.article.channelId}/articles/${props.article.id}`);
  }

  return (
    <div
      className="Component_OrganizationArticleTileVertical card card-body d-flex flex-column my-3 clickable"
      onClick={onTileClick}
    >
      <div className="img-container">
        <img src={props.article.imageSrc}></img>
      </div>
      <div className="mt-3">
        <h3 className="my-3">{props.article.title}</h3>
        <p className="my-3">{props.article.summary}</p>
      </div>
    </div>
  );
}

export default OrganizationArticleTileVertical;

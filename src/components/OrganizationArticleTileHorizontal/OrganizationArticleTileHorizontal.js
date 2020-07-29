import React from 'react';
import './OrganizationArticleTileHorizontal.scss';
import { NavLink } from 'react-router-dom';

function OrganizationArticleTileHorizontal(props) {
  return (
    <NavLink 
      to={`/channels/${props.article.channelId}/articles/${props.article.id}`}
      className="Component_OrganizationArticleTileHorizontal card card-body d-flex flex-row"
    >
      <div className="img-container">
        <img src={props.article.imageSrc}></img>
      </div>
      <div className="mx-5">
        <h2 className="my-3">{props.article.title}</h2>
        <p className="my-3">{props.article.summary}</p>
      </div>
    </NavLink>
  );
}

export default OrganizationArticleTileHorizontal;

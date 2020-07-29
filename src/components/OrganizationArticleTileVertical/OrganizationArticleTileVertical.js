import React from 'react';
import './OrganizationArticleTileVertical.scss';
import { NavLink } from 'react-router-dom';

function OrganizationArticleTileVertical(props) {
  return (
    <NavLink
      to={`/channels/${props.article.channelId}/articles/${props.article.id}`}
      className="Component_OrganizationArticleTileVertical card card-body d-flex flex-column my-3"
    >
      <div className="img-container">
        <img src={props.article.imageSrc}></img>
      </div>
      <div className="mt-3">
        <h3 className="my-3">{props.article.title}</h3>
        <p className="my-3">{props.article.summary}</p>
      </div>
    </NavLink>
  );
}

export default OrganizationArticleTileVertical;

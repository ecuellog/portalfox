import React from 'react';
import './OrganizationArticleTileHorizontal.scss';

function OrganizationArticleTileHorizontal(props) {
  return (
    <div className="Component_OrganizationArticleTileHorizontal card card-body d-flex flex-row">
      <div className="img-container">
        <img src={props.article.imageSrc}></img>
      </div>
      <div className="mx-5">
        <h2 className="my-3">{props.article.title}</h2>
        <p className="my-3">{props.article.summary}</p>
      </div>
    </div>
  );
}

export default OrganizationArticleTileHorizontal;

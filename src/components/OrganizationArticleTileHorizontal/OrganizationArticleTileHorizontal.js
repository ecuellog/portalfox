import React from 'react';
import blogImg from '../../assets/images/blogimgsample.jpg';
import './OrganizationArticleTileHorizontal.scss';

function OrganizationArticleTileHorizontal(props) {
  return (
    <div className="Component_OrganizationArticleTileHorizontal card card-body d-flex flex-row">
      <div className="img-container">
        <img src={blogImg}></img>
      </div>
      <div className="mx-5">
        <h2 className="my-3">{props.article.title}</h2>
        <p className="my-3">{props.article.summary}</p>
      </div>
    </div>
  );
}

export default OrganizationArticleTileHorizontal;

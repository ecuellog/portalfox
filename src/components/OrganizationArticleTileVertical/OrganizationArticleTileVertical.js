import React from 'react';
import blogImg from '../../assets/images/blogimgsample.jpg';
import './OrganizationArticleTileVertical.scss';

function OrganizationArticleTileVertical(props) {
  return (
    <div className="Component_OrganizationArticleTileVertical card card-body d-flex flex-column my-3">
      <div className="img-container">
        <img src={blogImg}></img>
      </div>
      <div className="mt-3">
        <h3 className="my-3">{props.article.title}</h3>
        <p className="my-3">{props.article.summary}</p>
      </div>
    </div>
  );
}

export default OrganizationArticleTileVertical;

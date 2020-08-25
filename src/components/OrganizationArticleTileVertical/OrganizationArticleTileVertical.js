import React from "react";
import "./OrganizationArticleTileVertical.scss";
import { useHistory } from "react-router-dom";

function OrganizationArticleTileVertical(props) {
  let history = useHistory();

  function onTileClick() {
    history.push(
      `/channels/${props.article.channelId}/articles/${props.article.id}`
    );
  }

  return (
    <div
      className="Component_OrganizationArticleTileVertical card card-body d-flex flex-column my-3 clickable p-0"
      onClick={onTileClick}
    >
      <div className="img-container">
        <img src={props.article.imageSrc}></img>
      </div>
      <div className="p-4">
        <h5>{props.article.title}</h5>
        <p className="my-3">{props.article.summary}</p>
      </div>
    </div>
  );
}

export default OrganizationArticleTileVertical;

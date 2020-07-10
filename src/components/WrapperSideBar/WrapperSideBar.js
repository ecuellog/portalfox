import React from 'react';
import './WrapperSideBar.scss';

function WrapperSideBar(props) {
  return (
    <div className="Component_WrapperSideBar container-fluid">
      <div className="row d-flex">
        <div className="sidebar-container">
          {props.sidebar}
        </div>
        <div className="flex-grow-1">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default WrapperSideBar;
import React from 'react';
import './WrapperSideBar.scss';

function WrapperSideBar(props) {
  return (
    <div className={'Component_WrapperSideBar container-fluid' + (props.navbar ? ' with-navbar' : '')}>
      <div className="row d-flex flex-nowrap">
        <div className={'sidebar-container' + (props.navbar ? ' with-navbar' : '')}>
          {props.sidebar}
        </div>
        <div className="children-container flex-grow-1">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default WrapperSideBar;
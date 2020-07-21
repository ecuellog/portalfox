import React, { useState } from 'react';
import * as firebase from "firebase/app";
import WrapperSideBar from '../../components/WrapperSideBar/WrapperSideBar';
import OrganizationChannelSideBar from '../../components/OrganizationChannelSideBar/OrganizationChannelSideBar';

function OrganizationMainView() {
  return (
    <WrapperSideBar sidebar={<OrganizationChannelSideBar/>}>
      hello
    </WrapperSideBar>
  );
}

export default OrganizationMainView;
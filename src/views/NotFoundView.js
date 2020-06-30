import React, { useState } from 'react';
import * as firebase from "firebase/app";

function NotFoundView() {
  return (
    <div>
      We're sorry, the page you are looking for does not exist. Please check your URL.
    </div>
  );
}

export default NotFoundView;
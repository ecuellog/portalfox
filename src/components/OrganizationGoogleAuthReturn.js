import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import  * as firebase from 'firebase/app';

function OrganizationGoogleAuthReturn() {
  let queryParams = new URLSearchParams(useLocation().search);
  let history = useHistory();

  useEffect(() => {
    firebase.auth().signInWithCustomToken(queryParams.get('token'))
      .then(() => {
        history.push('/');
      })
  }, []);

  return (
    <div>
    </div>
  );
}

export default OrganizationGoogleAuthReturn;
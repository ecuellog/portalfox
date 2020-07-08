import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import buildUrl from 'build-url';
import Axios from 'axios';

function OrganizationGoogleAuthRedirect() {
  let queryParams = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const authMode = queryParams.get('authMode');
    const authServerUrl = 'http://localhost:5001/portalfox-68431/us-central1/widgets'
    const authRedirectRoute = authMode === 'login' ? 'googleLoginRedirect' : 'googleRegisterRedirect'
    let state = {
      orgId: queryParams.get('orgId')
    }
    let stateString = JSON.stringify(state);

    Axios.get('https://accounts.google.com/.well-known/openid-configuration')
      .then((discoveryDoc) => {
        const googleAuthEndpoint = discoveryDoc.data.authorization_endpoint;
    
        let url = buildUrl(googleAuthEndpoint, {
          queryParams: {
            response_type: 'code',
            client_id: '363106845702-sg7818avj5jv0actub50qer9qpoom27q.apps.googleusercontent.com',
            scope: 'openid email',
            redirect_uri: `${authServerUrl}/orgs/${authRedirectRoute}`,
            state: stateString
          }
        })
    
        window.location.replace(url);
      });
  }, []);

  return (
    <div>
    </div>
  );
}

export default OrganizationGoogleAuthRedirect;
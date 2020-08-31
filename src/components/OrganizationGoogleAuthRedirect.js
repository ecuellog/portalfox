import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import buildUrl from 'build-url';
import Axios from 'axios';

function OrganizationGoogleAuthRedirect() {
  let queryParams = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const authMode = queryParams.get('authMode');
    const authServerUrl = `${process.env.GCLOUD_FUNCTIONS_URL}/widgets`
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
            client_id: process.env.GCLOUD_CLIENT_ID,
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
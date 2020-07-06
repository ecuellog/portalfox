import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import buildUrl from 'build-url';

function OrganizationGoogleAuthRedirect() {
  let queryParams = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const authMode = queryParams.get('authMode');
    const authServerUrl = 'http://localhost:5001/portalfox-68431/us-central1/widgets'
    const authEndpoint = authMode === 'login' ? 'googleLoginRedirect' : 'googleRegisterRedirect'
    let state = {
      orgId: queryParams.get('orgId')
    }
    let stateString = JSON.stringify(state);
    let url = buildUrl('https://accounts.google.com/o/oauth2/v2/auth', {
      queryParams: {
        response_type: 'code',
        client_id: '363106845702-sg7818avj5jv0actub50qer9qpoom27q.apps.googleusercontent.com',
        scope: 'openid email',
        redirect_uri: `${authServerUrl}/orgs/${authEndpoint}`,
        state: stateString
      }
    })

    window.location.replace(url);
  }, []);

  return (
    <div>
    </div>
  );
}

export default OrganizationGoogleAuthRedirect;
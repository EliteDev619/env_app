export const oktaAuthConfig = {
  issuer: `https://dev-00042327.okta.com/oauth2/default`,
  // issuer: `https://${process.env.REACT_APP_OKTA_BASE_URL}/oauth2/default`,
  clientId: '0oa7o54ve3d6eZnyj5d7',
  // clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ["openid", "profile", "email"],
  pkce: true,
};
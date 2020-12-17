import { initAuth0 } from '@auth0/nextjs-auth0'
import config from 'config'

export default initAuth0({
  domain: config.AUTH0.DOMAIN,
  clientId: config.AUTH0.CLIENT_ID,
  clientSecret: config.AUTH0.CLIENT_SECRET,
  audience: config.AUTH0.AUDIENCE,
  scope: 'openid profile',
  redirectUri: config.AUTH0.CALLBACK_URL,
  postLogoutRedirectUri: config.AUTH0.LOGOUT_REDIRECT,
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: config.AUTH0.COOKIE_SECRET,
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // // (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
    // cookieDomain: 'your-domain.com',
    // // (Optional) SameSite configuration for the session cookie. Defaults to 'lax', but can be changed to 'strict' or 'none'. Set it to false if you want to disable the SameSite setting.
    // cookieSameSite: 'lax',
    // // (Optional) Store the id_token in the session. Defaults to false.
    // storeIdToken: false,
    storeAccessToken: true,
    storeRefreshToken: true
  },
  oidcClient: {
    httpTimeout: 2500,
    clockTolerance: 10000
  }
});
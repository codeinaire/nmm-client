import auth0, { Auth0Error, Auth0Callback } from 'auth0-js';

import { ISignUpArgs, SignInTypes } from './types';

const DATABASE_CONNECTION = 'Username-Password-Authentication'

const webAuth = new auth0.WebAuth({
  domain: process.env.APP_DOMAIN || '',
  clientID: process.env.APP_CLIENT_ID || '',
  redirectUri: process.env.REDIRECT_URL,
  responseType: 'token id_token',
  scope: 'openid profile email',
  audience: process.env.AUDIENCE
});

const responseCallback: Auth0Callback<Auth0Error, any> = (error: Auth0Error, res: any): void => {
  if (error) return console.log(`Error: ${error.description}`);
  return console.log(`You, ${res.user_metadata}, successfully signed up`);
};

export const signIn = (type: SignInTypes, email?: string, password = ''): void => {
  if(type === SignInTypes.auth0) {
    webAuth.login({
      realm: DATABASE_CONNECTION,
      email,
      password
    }, responseCallback)
  }

  if(type === SignInTypes.social) {
    webAuth.authorize({
      connection: 'facebook'
    })
  }
}

export const signUp = ({ email, password, username, user_metadata }: ISignUpArgs): void => {
  webAuth.signup({
    connection: DATABASE_CONNECTION,
    email,
    password,
    username,
    user_metadata
  }, responseCallback);
}
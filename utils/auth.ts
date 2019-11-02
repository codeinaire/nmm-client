import auth0, { Auth0Error, Auth0Callback } from 'auth0-js';
import logger from './logger';

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
  console.log('TEST');
  if (error) {
    logger.log({
      level: 'ERROR',
      description: error.description
    });
  } else {
    logger.log({
      level: 'INFO',
      description: `You, ${res.username}, have been successful`
    })
  }
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

export const signUp = ({ email, password, username }: ISignUpArgs): void => {
  console.log('IN SIGNUP', email, password, username);
  webAuth.signup({
    connection: DATABASE_CONNECTION,
    email,
    password,
    username
  }, responseCallback);
}
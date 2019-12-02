import auth0, { Auth0Error, Auth0Callback } from 'auth0-js'
import logger from './logger'

import { ISignUpArgs, SignInTypes } from './types'

const DATABASE_CONNECTION = 'Username-Password-Authentication'
const SOCIAL_MEDIA_SIGN_IN = 'facebook'

export const webAuth = new auth0.WebAuth({
  domain: process.env.APP_DOMAIN || '',
  clientID: process.env.APP_CLIENT_ID || '',
  redirectUri: process.env.REDIRECT_URL,
  responseType: 'token id_token',
  scope: 'openid profile email',
  audience: process.env.AUDIENCE
})

const responseCallback: Auth0Callback<Auth0Error, any> = (
  error: Auth0Error,
  res: any
): void => {
  if (error) {
    logger.log({
      level: 'ERROR',
      description: `Auth0 Error - ${error.description}`
    })
  } else {
    logger.log({
      level: 'INFO',
      description: `${res.username}, have been successfully signed in`
    })
  }
}

export const signIn = (
  type: SignInTypes,
  email?: string,
  password = ''
): void => {
  if (type === SignInTypes.auth0) {
    logger.log({
      level: 'INFO',
      description: `${email} address, is signing in with Auth0`
    })
    webAuth.login(
      {
        realm: DATABASE_CONNECTION,
        email,
        password
      },
      responseCallback
    )
  }

  if (type === SignInTypes.social) {
    logger.log({
      level: 'INFO',
      description: `${email} address, is signing in with Facebook`
    })
    webAuth.authorize({
      connection: SOCIAL_MEDIA_SIGN_IN
    })
  }
}

export const signUp = ({ email, password, username }: ISignUpArgs): void => {
  logger.log({
    level: 'INFO',
    description: `${username} with ${email} address, is signing up`
  })
  webAuth.signup(
    {
      connection: DATABASE_CONNECTION,
      email,
      password,
      username
    },
    responseCallback
  )
}

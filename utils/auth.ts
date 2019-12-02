import auth0, { Auth0Error } from 'auth0-js'
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

// TODO - fix res: any type - find out what it returns
export const signIn = (
  type: SignInTypes,
  email?: string,
  password = ''
): void | Promise<any | undefined> => {
  if (type === SignInTypes.auth0) {
    logger.log({
      level: 'INFO',
      description: `${email} address, is signing in with Auth0`
    })
    return new Promise((resolve, reject) => {
      webAuth.login(
        {
          realm: DATABASE_CONNECTION,
          email,
          password
        },
        (error: Auth0Error | null, res: any) => {
          if (error) {
            logger.log({
              level: 'ERROR',
              description: `Auth0 Sign In Error - ${error.description}`
            })
            reject(error)
          } else {
            logger.log({
              level: 'INFO',
              description: `${res.username}, has been successfully signed in`
            })
            resolve(res)
          }
        }
      )
    })
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

export const signUp = ({ email, password, username }: ISignUpArgs): Promise<void> => {
  logger.log({
    level: 'INFO',
    description: `${username} with ${email} address, is signing up`
  })
  return new Promise((resolve, reject) => {
    webAuth.signup(
      {
        connection: DATABASE_CONNECTION,
        email,
        password,
        username
      },
      (error: Auth0Error | null, res: any) => {
        if (error) {
          logger.log({
            level: 'ERROR',
            description: `Auth0 Sign Up Error - ${error.description}`
          })
          reject(error)
        } else {
          logger.log({
            level: 'INFO',
            description: `${res.username}, has been successfully signed up`
          })
          resolve(res)
        }
      }
    )
  })
}

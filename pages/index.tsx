import React, { useEffect } from 'react'
import Router from 'next/router'
import { useApolloClient } from '@apollo/react-hooks'
import Link from 'next/link'
import { webAuth } from '../utils/auth'
import logger from '../utils/logger'

/**
 * @remark this page will show links to recipes, profile, etc
 */
export default function Home() {
  const apolloClient = useApolloClient()

  // TODO - move these sign in details to a dead page that renders
  // no content, that way index is free from it. I can
  // redirect appropriately through the logic
  useEffect(() => {
    const signedIn = localStorage.getItem('signed_in')

    if (signedIn == 'true') {
      webAuth.parseHash({ hash: window.location.hash }, (err, authResult) => {
        if (err) {
          // TODO - fix state does not match error
          return logger.log({
            level: 'ERROR',
            description: `Auth0 Parsing Error - ${err.errorDescription}`
          })
        }

        if (authResult) {
          const userData = authResult.idTokenPayload
          logger.log({
            level: 'INFO',
            description: 'Index - writing access token to cache.'
          })
          apolloClient.writeData({
            data: {
              accessToken: authResult.accessToken
            }
          })

          const FIRST_TIME_SIGNIN = 1
          const isFirstTimeLogin =
            userData[`${process.env.CLIENT_URL}/login_count`] ==
            FIRST_TIME_SIGNIN
          if (isFirstTimeLogin) {
            logger.log({
              level: 'INFO',
              description: 'Index - redirect to create profile.'
            })
            Router.push({
              pathname: '/create-profile',
              query: {
                userId: userData.sub
              }
            })
          } else {
            logger.log({
              level: 'INFO',
              description: 'Index - redirect to another page.'
            })
            Router.push({
              pathname: '/recipes',
              query: {
                userId: userData.sub
              }
            })
            // TODO - send to recipe index page or last page user was on
          }
        }
      })
    }
  })
  return (
    <div>
      <Link href='/signin'>
        <a>Index</a>
      </Link>
      <h1>Redirecting...</h1>
    </div>
  )
}

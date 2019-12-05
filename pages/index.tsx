import React, { useEffect } from 'react'
import Router from 'next/router'
import { useApolloClient } from '@apollo/react-hooks'
import Link from 'next/link'

import { webAuth } from '../utils/auth'
import logger from '../utils/logger'

// N.B. - this will show links to recipes, profile, etc
export default function Home() {
  const apolloClient = useApolloClient()

  useEffect(() => {
    const signedIn = localStorage.getItem('signed_in')
    console.log('signed_in', signedIn)

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
          apolloClient.writeData({
            data: {
              accessToken: authResult.accessToken
            }
          })

          const FIRST_TIME_SIGNIN = 1
          const isFirstTimeLogin =
            userData[`${process.env.CLIENT_URI}/login_count`] ==
            FIRST_TIME_SIGNIN
          if (isFirstTimeLogin) {
            Router.push('/create-profile')
          } else {
            // TODO - send to recipe index page or last page user was on
          }
        }
      })
    }
  })
  return (
    <div>
      <Link href="/signin">
        <a>Index</a>
      </Link>
      <h1>Welcome Home!</h1>
    </div>
  )
}

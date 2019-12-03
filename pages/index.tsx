import React, { useEffect } from 'react'
import Router from 'next/router'

import { webAuth } from '../utils/auth'
import logger from '../utils/logger'

export default function Home() {


  useEffect(() => {
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

      const FIRST_TIME_SIGNIN = 11
      const isFirstTimeLogin = userData[`${process.env.CLIENT_URI}/login_count`] == FIRST_TIME_SIGNIN
      if (isFirstTimeLogin) {
        Router.push('/create-profile')
      } else {
        // TODO - send to recipe index page or last page user was on
      }
     }
    })
  })
  return (
    <div>
      <h1>Welcome Home!</h1>
    </div>
  )
}

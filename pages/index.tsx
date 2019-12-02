import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
// import Head from 'next/head'
// import Router from 'next/router'

import { webAuth } from '../utils/auth'
import logger from '../utils/logger'
// import RecipeTest from '../components/RecipeTest'

export default function Home() {
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    webAuth.parseHash({ hash: window.location.hash }, (
      err,
      authResult
    ) => {
      if (err) {
        return logger.log({
          level: 'ERROR',
          description: `Auth0 Parsing Error - ${err.description}`
        })
      }

      if (authResult && authResult.accessToken != null) {
        setAccessToken(authResult.accessToken)
        const userData = authResult.idTokenPayload
        console.log('data@@@@@@', userData)
        console.log('authResult', authResult)

        // localStorage.setItem('userDeets', authResult)
        // localStorage.setItem('signed_in', true)
        // const location = localStorage.getItem('last_url')
        // const urlObject = new URL(location)
        // Router.push(urlObject.pathname);
      }
    })
  }, [accessToken])
  return (
    <div>
      <h1>Welcome Home!</h1>
      {/* <RecipeTest /> */}
    </div>
  )
}

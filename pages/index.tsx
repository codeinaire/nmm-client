import React, { useEffect } from 'react'
import Router from 'next/router'
import { useApolloClient } from '@apollo/react-hooks'
import { Box, Button, Paragraph } from 'grommet'

import { parseAuthHash } from '../utils/auth'
import logger from '../utils/logger'
import { isServer } from '../utils/misc'
import useCheckSigninStatus from '../hooks/useCheckSigninStatus'
import SignIn from '../containers/SignIn'

// const HeadingStyled = styled(Heading)`
//   font-family: 'NoMeatMayTitle';
//   text-align: center;
//   position: none;
// `
/**
 * @remark this page will show links to recipes, profile, etc
 */
export default function Home() {
  const apolloClient = useApolloClient()
  const { signedIn } = useCheckSigninStatus()

  useEffect(() => {
    async function parsingAuthHash() {
      const signedIn = localStorage.getItem('signed_in')
      /**
       * @remark this will only run
       */
      if (!isServer() && window.location.hash && signedIn == 'true') {
        try {
          const authResult = await parseAuthHash()
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
              userData[`${process.env.CLIENT_URL}login_count`] ==
              FIRST_TIME_SIGNIN
            if (isFirstTimeLogin) {
              logger.log({
                level: 'INFO',
                description: 'Index - redirect to create profile.'
              })
              Router.push({
                pathname: '/update-profile',
                query: {
                  userId: userData.sub
                }
              })
            } else {
              logger.log({
                level: 'INFO',
                description: 'Index - redirect to home page.'
              })
              Router.push({
                pathname: '/',
                query: {
                  userId: userData.sub
                }
              })
              // TODO - send to recipe index page or last page user was on
            }
          }
        } catch (_) {
          localStorage.setItem('signed_in', 'false')
        }
      }
    }
    parsingAuthHash()
  }, [apolloClient])

  if (!isServer() && window.location.hash) return <h1>Redirecting...</h1>
  if (!signedIn) {
    return (
      <Box
        align='center'
        direction='column'
        justify='center'
        margin={{ bottom: '100px' }}
        responsive={true}
      >
        <h1 className='impactFont margins-top-bot'>Please Sign In!</h1>
        <SignIn />
        <Button
          a11yTitle='go to sign up page'
          data-testid='button'
          hoverIndicator={{ color: 'white' }}
          href='/signup'
          label='SIGN UP'
          margin='medium'
          primary={true}
          type='button'
        />
      </Box>
    )
  }

  return (
    <Box
      align='center'
      direction='column'
      height='100vh'
      justify='center'
      responsive={true}
    >
      <h1 className='impactFont'>Welcome to the No Meat May App</h1>
      <Paragraph>
        By eating less animal products, or going meat free, you can protect our
        planet, your health, and save living beings, both human and animal from
        suffering.
      </Paragraph>
      <Paragraph>
        The power to change the world for the better is in our hands. What are
        we going to do with all that power?
      </Paragraph>
      <Button
        a11yTitle='go to sign up page'
        data-testid='button'
        hoverIndicator={{ color: 'white' }}
        href='/recipes-by-meal'
        label='RECIPES'
        margin='medium'
        primary={true}
        type='button'
      />
    </Box>
  )
}

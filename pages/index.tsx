import React, { useEffect, useContext } from 'react'
import Router from 'next/router'
import { useApolloClient } from '@apollo/react-hooks'
import { Box, Button, Paragraph, Heading, Image } from 'grommet'
import { useMediaQuery } from 'react-responsive'
import { Context as ResponsiveContext } from 'react-responsive'

import { parseAuthHash } from '../utils/auth'

import { isServer } from '../utils/misc'
import FacebookSignIn from '../components/FacebookSignIn'
import styled from 'styled-components'

const Grid = styled.main`
  display: grid;
  grid-template-areas: 'header header' 'sidepic1 content-intro' 'sidepic1 content-points' 'content-action sidepic2 ' 'content-action sidepic2';
`

const Mobile = styled.main`
  main {
    display: block;
    text-align: justify;
  }
  p {
    margin-left: 1em;
    margin-right: 1em;
  }
`

/**
 * @remark this page will show links to recipes, profile, etc tdt
 */
export default function Home() {
  const apolloClient = useApolloClient()
  const isMobile = useMediaQuery({ minWidth: 700 })
  const responsive = useContext(ResponsiveContext)

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
            console.log({
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
              console.log({
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
              console.log({
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

  const GridMobile = isMobile ? Grid : Mobile

  if (!isServer() && window.location.hash) return <h1>Redirecting...</h1>

  return (
    <>
      <GridMobile aria-label='container for home page content'>
        <Box
          a11yTitle='container for header image in grid'
          gridArea='header'
          direction='row'
          as='header'
        >
          <Image
            a11yTitle='header image of 5 people with vegetables and no meat may title'
            src='/heroImage.png'
            fit='contain'
          />
        </Box>
        <Box justify='center' gridArea='content-intro'>
          <Heading
            alignSelf='center'
            className='impactFont'
            level='2'
            margin={{
              top: '30px',
              bottom: '10px'
            }}
            textAlign='center'
          >
            Welcome to the No Meat May App
          </Heading>
          <Paragraph alignSelf='center'>
            We're trying something new here at No Meat May. We heard about this
            app thingy and decided to give it a go.
          </Paragraph>
          <Paragraph alignSelf='center'>
            But it's our first time. And, unfortnately, as <i>volunteers</i> we
            have limited time and resources so this is an experimental app - a
            work in progress! Ain't we all!?
          </Paragraph>
          <Paragraph alignSelf='center'>
            So why use it? Well, we'll be offering recipes to <i>anyone</i>,
            just go to the recipes link above and you'll get a random selection
            of 3 recipes for each meal of the day.
          </Paragraph>
          <Paragraph alignSelf='center'>
            But if you sign up you'll get access to all the recipes. There's
            over 100! There's two ways to sign up, through Facebook or
            registering through the app.
          </Paragraph>
        </Box>
        <Box
          a11yTitle='container for side image'
          gridArea='sidepic1'
          direction='row'
        >
          <Image
            a11yTitle='side image of cute piglet'
            src='/piggy.png'
            fit='contain'
          />
        </Box>
        <Box justify='center' gridArea='content-points'>
          <Heading
            alignSelf='center'
            className='impactFont'
            level='2'
            margin={{
              bottom: '10px'
            }}
            textAlign='center'
          >
            Gain Points!
          </Heading>
          <Paragraph alignSelf='center'>
            We're also rewarding points for completing a recipe. Just
            press/click on the ingredients and method to complete that recipe.
          </Paragraph>
          <Paragraph alignSelf='center'>
            For more points you can share the recipe to your Facebook wall. Then
            for even more points you can take a photo of yourself and the
            finished product to share on the No Meat May Facebook Group!
          </Paragraph>
          <Paragraph alignSelf='center'>
            Due to the experimental nature of the app we are still working on
            better ways to gain points, but the recipe is the start! We are also
            working on ways to redeem those points!
          </Paragraph>
          <Paragraph alignSelf='center'>
            Before you ask. Yes, points accumulated now will be redeemable for
            future goodies!
          </Paragraph>
        </Box>

        <Box
          a11yTitle='container for side image'
          gridArea='sidepic2'
          direction='row'
        >
          <Image
            a11yTitle='side image of cute piglet'
            src='/nmmCelery.png'
            fit='contain'
          />
        </Box>
        <Box align='center' justify='center' gridArea='content-action'>
          <Heading
            alignSelf='center'
            className='impactFont'
            level='2'
            margin={{
              bottom: '20px'
            }}
            textAlign='center'
          >
            Sign Up Now!
          </Heading>
          <Paragraph alignSelf='center' margin={{ bottom: '20px' }}>
            Start accumulating points by making recipes, sharing them and
            Facebook, and sharing photos of you and the finished product on the
            No Meat May Group!
          </Paragraph>
          <Heading
            className='impactFont'
            level='3'
            textAlign='center'
            margin={{
              bottom: '15px'
            }}
          >
            Option 1 - Full Recipe Access & Sharing
          </Heading>
          <Paragraph alignSelf='center' margin={{ bottom: '25px' }}>
            By signing up through Facebook, you'll get access to over{' '}
            <i>100 recipes</i> but also the ability to share the recipes on your
            Facebook wall and share a photo of your creation in the No Meat May
            group.
          </Paragraph>
          <FacebookSignIn />
          <Heading
            className='impactFont'
            level='3'
            textAlign='center'
            margin={{
              top: '30px',
              bottom: '15px'
            }}
          >
            Option 2 - Full Recipe Access
          </Heading>
          <Paragraph alignSelf='center' margin={{ bottom: '25px' }}>
            Of course, not everyone to get Facebook involved so you can just
            sign up through the app itself. You'll still get access to{' '}
            <i>100 recipes</i> but won't be able to share them on Facebook.
          </Paragraph>
          <Button
            a11yTitle='go to sign up page'
            data-testid='button'
            hoverIndicator={{ color: 'white' }}
            href='/signup'
            label='SIGN UP'
            margin='small'
            primary={true}
            type='button'
          />
        </Box>
      </GridMobile>
    </>
  )
}

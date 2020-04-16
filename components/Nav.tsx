import React from 'react'
import { Box, Anchor, Menu } from 'grommet'
import { Home, Cafeteria, Accessibility, Logout, Login } from 'grommet-icons'
import { useMediaQuery } from 'react-responsive'
import Router from 'next/router'

import { logout } from '../utils/auth'
import useCheckSigninStatus from '../hooks/useCheckSigninStatus'

export default function Navigation({ page }: { page: string }) {
  const isMobile = useMediaQuery({ query: '(max-device-width: 700px)' })

  // Custom hooks
  const { signedIn } = useCheckSigninStatus()
  if (page == 'SignInPage' || page == 'SignUpPage') return null
  return (
    <Box
      a11yTitle='navigation bar'
      as='nav'
      background='#002E5D'
      basis='medium'
      direction='row'
      justify='between'
      responsive={true}
    >
      <Anchor
        a11yTitle='link to index page'
        href='/index'
        icon={<Home color='white' />}
        label='Home'
        className='impactFont'
      />
      {isMobile ? (
        <>
          {signedIn ? (
            <Menu
              a11yTitle='dropdown menu for nav links'
              dropBackground='#002E5D'
              items={[
                {
                  label: 'Recipes',
                  onClick: () => {
                    Router.push({
                      pathname: '/recipes-by-meal'
                    })
                  }
                },
                {
                  label: 'Profile',
                  onClick: () => {
                    Router.push({
                      pathname: '/profile'
                    })
                  }
                },
                {
                  label: 'Logout',
                  onClick: () => {
                    logout()
                  }
                }
              ]}
              label='Menu'
            />
          ) : (
            <>
              <Anchor
                a11yTitle='link to the recipes page'
                href='/recipes-by-meal'
                icon={<Cafeteria color='white' />}
                label='Recipes'
                className='impactFont'
              />
              <Anchor
                a11yTitle='signin'
                icon={<Login color='white' />}
                href='/signin'
                label='Sign In'
                className='impactFont'
              />
            </>
          )}
        </>
      ) : (
        <>
          <Anchor
            a11yTitle='link to the recipes page'
            href='/recipes-by-meal'
            icon={<Cafeteria color='white' />}
            label='Recipes'
            className='impactFont'
          />
          {signedIn ? (
            <>
              <Anchor
                a11yTitle='link to the profile page'
                href='/profile'
                icon={<Accessibility color='white' />}
                label='Profile'
                className='impactFont'
              />
              <Anchor
                a11yTitle='logout'
                icon={<Logout color='white' />}
                onClick={() => logout()}
                label='Logout'
                className='impactFont'
              />
            </>
          ) : (
            <Anchor
              a11yTitle='signin'
              icon={<Login color='white' />}
              href='/signin'
              label='Sign In'
              className='impactFont'
            />
          )}
        </>
      )}
    </Box>
  )
}

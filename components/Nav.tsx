import React from 'react'
import { Box, Anchor } from 'grommet'
import { Home, Cafeteria, Accessibility, Logout } from 'grommet-icons'
import { logout } from '../utils/auth'

export default function Navigation({ page }: { page: string }) {
  if (page == 'SignInPage' || page == 'SignUpPage') return null
  return (
    <Box
      a11yTitle='navigation bar'
      as='nav'
      background='red'
      basis='medium'
      direction='row-responsive'
      justify='between'
      responsive={true}
    >
      <Anchor
        a11yTitle='link to index page'
        href='/index'
        icon={<Home color='white' />}
      />
      <Anchor
        a11yTitle='link to the recipes page'
        href='/recipes'
        icon={<Cafeteria color='white' />}
      />
      <Anchor
        a11yTitle='link to the profile page'
        href='/profile'
        icon={<Accessibility color='white' />}
      />
      <Anchor
        a11yTitle='logout'
        icon={<Logout color='white' />}
        onClick={() => logout()}
      />
    </Box>
  )
}

import React from 'react'
import { Box, Button } from 'grommet'

import SignIn from '../containers/SignIn'

export default function SignInPage() {
  return (
    <Box
      align='center'
      background='url(/stir-fried-noodles-vegetables.jpg)'
      direction='column'
      height='100%'
      justify='center'
      responsive={true}
    >
      <SignIn />
      <Button
        a11yTitle='go to sign up page'
        data-testid='button'
        hoverIndicator={{ color: 'white' }}
        href='/signup'
        label='SIGN UP'
        margin={{
          top: '24px',
          bottom: '100px'
        }}
        primary={true}
        type='button'
      />
    </Box>
  )
}

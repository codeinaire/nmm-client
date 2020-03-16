import React from 'react'
import { Footer, Anchor } from 'grommet'
import { Instagram, Facebook, Twitter } from 'grommet-icons'

export default function FooterComponent({ page }: { page: string }) {
  if (page == 'SignInPage' || page == 'SignUpPage') return null
  return (
    <Footer a11yTitle='footer' background='red'>
      <Anchor
        a11yTitle='link to no meat may website'
        href='https://www.nomeatmay.net/'
        label='No Meat May'
      />
      <Anchor
        a11yTitle='link to instagram page'
        href='https://www.instagram.com/no_meat_may/'
        icon={<Instagram color='#19e5e5' />}
      />
      <Anchor
        a11yTitle='link to the twitter page'
        href='http://www.twitter.com/nomeatmay'
        icon={<Twitter color='#19e5e5' />}
      />
      <Anchor
        a11yTitle='link to the facebook page'
        href='https://www.facebook.com/nomeatmay/'
        icon={<Facebook color='#19e5e5' />}
      />
    </Footer>
  )
}

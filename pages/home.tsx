import React from 'react'
import Link from 'next/link'
import PleaseSignIn from '../containers/PleaseSignIn'
import { logout } from '../utils/auth'

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to home page!</h1>
      <Link href='/recipes'>
        <a>Recipes</a>
      </Link>
      <PleaseSignIn message='Come on mate sign in!'>
        {(userProfileId: string) => (
          <p>You've signed in {userProfileId}. AWESOME!!</p>
        )}
      </PleaseSignIn>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

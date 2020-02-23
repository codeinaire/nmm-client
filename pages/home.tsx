import React from 'react'
import Link from 'next/link'
import { logout } from '../utils/auth'

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to home page!</h1>
      <Link href='/recipes'>
        <a>Recipes</a>
      </Link>
      {/* TODO - create nav bar */}
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

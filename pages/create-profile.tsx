import React from 'react'
import CreateProfile from '../containers/CreateProfile'
import PleaseSignIn from '../containers/PleaseSignIn'

export default function CreateProfilePage() {
  return (
    <div>
      <h1>Welcome to create profile page!</h1>
      <PleaseSignIn message='Please sign up and/or sign in to create your profile'>
        {(userProfileId: string) => (
          <CreateProfile userProfileId={userProfileId} />
        )}
      </PleaseSignIn>
    </div>
  )
}

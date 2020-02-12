import React from 'react'
import Recipe from '../../../containers/Recipe'
import PleaseSignIn from '../../containers/PleaseSignIn'

export default function RecipePage() {
  return (
    <div>
      <PleaseSignIn message='Please sign up and/or sign in to create your profile'>
        {(userProfileId: string) => <Recipe userProfileId={userProfileId} />}
      </PleaseSignIn>
    </div>
  )
}

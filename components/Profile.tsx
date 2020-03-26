import React from 'react'
import { Box, Button, Heading, Image } from 'grommet'
import useCheckSigninStatus from '../hooks/useCheckSigninStatus'
import useGetUserProfile from '../hooks/useGetUserProfile'
import SignIn from '../containers/SignIn'

export default function ProfilePage() {
  const { signedIn, userProfileId } = useCheckSigninStatus()
  const { loading, error, data } = useGetUserProfile(userProfileId)

  if (!signedIn) {
    return (
      <Box
        a11yTitle='sign in container'
        align='center'
        background='white'
        justify='center'
        margin='medium'
      >
        <h3>Sorry, you have to be signed in to see your profile!</h3>
        <SignIn />
      </Box>
    )
  }
  if (error) return <h3>Sorry there was an error: {error.message}</h3>
  if (loading) return <h3>Loading...</h3>

  const {
    bio,
    challengeGoals,
    challengeQuote,
    standardResolution,
    motivations,
    totalPoints,
    username
  } = data.me
  return (
    <Box
      a11yTitle='update profile container'
      align='center'
      background='white'
      justify='center'
      margin='medium'
    >
      <Heading a11yTitle='update profile heading'>Hey {username}!</Heading>
      <Image
        src={standardResolution}
        alt={`An image of ${username}`}
        height='360'
        width='400'
      />
      <h2>Wow! You have {totalPoints} points!</h2>
      <p>
        <i>{challengeQuote}</i>
      </p>
      <p>
        <strong>Bio: </strong>
        {bio}
      </p>
      <p>You're motivated by these important issues:</p>
      <ul>
        {motivations.map((motivation: string) => (
          <li key={motivation}>{motivation}</li>
        ))}
      </ul>
      <p>
        Which will keep you going to complete {challengeGoals} challenges a week
      </p>
      <Button
        a11yTitle='update your profile button'
        data-testid='submit'
        hoverIndicator={true}
        href='/update-profile'
        label='UPDATE PROFILE'
        margin={{
          top: '0',
          bottom: '30px'
        }}
        primary={true}
        type='button'
      />
    </Box>
  )
}

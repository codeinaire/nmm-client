import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { checkSession } from '../utils/auth'

import SignIn from './SignIn'

// const GET_CURRENT_USER = gql`
//   query me($id: String!) {
//     me(id: $id) {
//       id
//       totalPoints
//       username
//       lowResProfile
//     }
//   }
// `

export default function PleaseSignIn({
  children,
  message
}: {
  children: any
  message: string
}) {
  const [userProfileId, setUserProfileId] = useState()
  const [signedIn, setSignedIn] = useState()
  useEffect(() => {
    console.log('inside useEFFECT')

    async function checkingSession() {
      try {
        const result = await checkSession()
        localStorage.setItem('signed_in', 'true')
        setUserProfileId(result?.idTokenPayload.sub)
        setSignedIn(true)
        console.log('inside TRY')
      } catch (_) {
        localStorage.setItem('signed_in', 'false')
        console.log('inside CATCH')
        setSignedIn(false)
      }
    }
    checkingSession()
  }, [])
  console.log('outside###', signedIn)
  // const { loading, error, data } = useQuery(GET_CURRENT_USER, {
  //   variables: { id: userProfileId }
  // })

  // if (loading) return <h1>'Loading...'</h1>
  // if (error) return <h1>`Error! ${error.message}`</h1>
  if (signedIn == undefined) return <h1>Loading...</h1>

  if (!signedIn) {
    return (
      <div>
        <p>{message}</p>
        <SignIn />
      </div>
    )
  }
  return children(userProfileId)
}

import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { withRouter, Router } from 'next/router'
import logger from '../utils/logger'

import FbUserShare from '../components/FbUserShare'
import FbInitAndToken from '../containers/FbInitParent'

import { OnSubmitObject } from '../components/types'
import { FormikHelpers } from 'formik'
// These are the inputs I need for challenge
// type: TypeEnum!
//     sectionsCompleted: [SectionsCompletedEnum!]!
//     difficulty: ChallengeDifficultyEnum!
//     lowResSharedFriendsImage: String
//     standardResolution: String
//     recipeId: Int!

const LiveFaceDetect = dynamic(() => import('../components/LiveFaceDetect'), {
  ssr: false
})

const GET_RECIPE = gql`
  query recipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      title
      ingredients
      method
      standardResolution
      difficulty
      cost
      mealType
      hashtags
      recipeAttribution {
        name
        website
        email
        facebook
        instagram
        twitter
      }
    }
  }
`

const GET_CHALLENGE = gql`
  query challenge($recipeId: ID!) {
    challenge(recipeId: $recipeId) {
      id
      sectionsCompleted
      sharedFriendsImages {
        standardResolution
      }
    }
  }
`

const CREATE_UPDATE_CHALLENGE = gql`
  mutation createOrUpdateChallenge($challengeInput: ChallengeInput) {
    createOrUpdateChallenge(challengeInput: $challengeInput) {
      id
    }
  }
`

const Recipe = ({ recipeId, router }: { recipeId: number; router: Router }) => {
  const [takePhoto, setTakePhoto] = useState(false)
  const {
    loading: recipeLoading,
    error: recipeError,
    data: recipeData
  } = useQuery(GET_RECIPE, {
    variables: { recipeId }
  })
  const {
    loading: challengeLoading,
    error: challengeError,
    data: challengeData
  } = useQuery(GET_CHALLENGE, {
    variables: { recipeId }
  })
  const [
    createOrUpdateChallenge,
    { loading: mutationLoading, error: mutationError, data: mutationData }
  ] = useMutation(CREATE_UPDATE_CHALLENGE)
  // state for createOrUpdateChallenge containing type, sectionsCompleted,
  // difficulty, lowsResSharedFriendsImage, standardResolution, recipeId
  const [
    createOrUpdateChallengeState,
    setcreateOrUpdateChallengeState
  ] = useState({
    type: 'Recipe',
    sectionsCompleted: [],
    difficulty: recipeData.recipe.difficulty,
    lowsResSharedFriendsImage: '',
    standardResolution: '',
    recipeId
  })
  // state for GET_CHALLENGE containing sectionsCompleted, and
  // lowResSharedFriendsImage

  // const formInitialValues = [
  //   { name: 'type', value: 'Recipe' },
  //   { name: 'sectionsCompleted', value: [] },
  //   { name: 'difficulty', value: data.recipe.difficulty },
  //   { name: 'lowResSharedFriendsImage', value: '' },
  //   { name: 'standardResolution', value: '' },
  //   { name: 'recipeId', value: recipeId }
  // ]

  console.log('data', recipeData)

  if (recipeError) return <h1>`Error! ${recipeError.message}`</h1>
  if (recipeLoading) return <h1>'Loading...'</h1>

  return (
    <>
      <h1>Title: {recipeData.recipe.title}</h1>
      <h2>Meal Type: {recipeData.recipe.mealType}</h2>
      <h2>Difficulty: {recipeData.recipe.difficulty}</h2>
      <h2>Budget: {recipeData.recipe.cost}</h2>
      <h3>Ingredients</h3>
      <div onClick={() => console.log('testing')}>
        {recipeData.recipe.ingredients.map((ingredient: string) => (
          <p>{ingredient}</p>
        ))}
      </div>
      <h4>Method</h4>
      {recipeData.recipe.method.map((step: string) => (
        <li>{step}</li>
      ))}
      <div>{takePhoto ? <LiveFaceDetect /> : null}</div>
      <button onClick={() => setTakePhoto(true)}>Take photo!</button>
      {/* TODO - maybe get quote from the recipe? */}
      <FbInitAndToken>
        {() => (
          <FbUserShare
            href={`${process.env.CLIENT_URI}${router.asPath}`}
            quote='This is an amazing recipe!'
          />
        )}
      </FbInitAndToken>
    </>
  )
}

export default withRouter(Recipe)

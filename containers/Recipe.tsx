import React, {
  useState,
  useReducer,
  createContext,
  useEffect,
  useContext
} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { withRouter, Router } from 'next/router'
import logger from '../utils/logger'

import FbUserShare from '../components/FbUserShare'
import FbInitAndToken from '../containers/FbInitParent'

import { FormikHelpers } from 'formik'
import { OnSubmitObject } from '../components/types'
import {
  DispatchCreateOrUpdateChallengeState,
  CreateUpdateChallengeState,
  ActionType,
  ImageUrls
} from '../containers/types'

// These are the inputs I need for challenge
// type: TypeEnum!
//     sectionsCompleted: [SectionsCompletedEnum!]!
//     difficulty: ChallengeDifficultyEnum!
//     lowsResSharedFriendsImage: String
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

function reducerCreateOrUpdateChallengeState(
  state: CreateUpdateChallengeState,
  action: ActionType,
  imageUrls?: ImageUrls
): CreateUpdateChallengeState {
  switch (action.type) {
    case 'ingredients':
      return {
        ...state,
        sectionsCompleted: state.sectionsCompleted.concat(['Ingredients'])
      }
    case 'method':
      return {
        ...state,
        sectionsCompleted: state.sectionsCompleted.concat(['Method'])
      }
    case 'SharedFriendsImage':
      return {
        ...state,
        standardResolution: imageUrls?.standardResolution || '',
        lowsResSharedFriendsImage: imageUrls?.lowsResSharedFriendsImage || ''
      }
    default:
      throw new Error('Failed to update recipe challenge state!')
  }
}
const CreateUpdateChallengeDispatch = createContext<
  DispatchCreateOrUpdateChallengeState | undefined
>(undefined)

export function useCreateUpdateChallengeDispatch() {
  const dispatchCreateOrUpdateChallengeState = useContext(
    CreateUpdateChallengeDispatch
  )
  if (dispatchCreateOrUpdateChallengeState === undefined) {
    throw new Error(
      'useCreateUpdateChallengeDispatch must be used within a CreateUpdateChallengeDispatch.Provider'
    )
  }
  return dispatchCreateOrUpdateChallengeState
}

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
  // CreateOrUpdate apollo and react state
  const INITIAL_CREATE_UPDATE_CHALLENGE_STATE: CreateUpdateChallengeState = {
    sectionsCompleted: [],
    lowsResSharedFriendsImage: '',
    standardResolution: ''
  }
  const [
    createOrUpdateChallengeState,
    dispatchCreateOrUpdateChallengeState
  ] = useReducer(
    reducerCreateOrUpdateChallengeState,
    INITIAL_CREATE_UPDATE_CHALLENGE_STATE
  )
  const [createOrUpdateChallenge] = useMutation(CREATE_UPDATE_CHALLENGE)
  useEffect(() => {
    async function createUpdateChallengeApi(values: any) {
      try {
        const challenge = await createOrUpdateChallenge({
          variables: {
            challengeInput: values
          }
        })
        logger.log({
          level: 'INFO',
          description: `Challenge ${challenge.data.createOrUpdateChallenge.id} with title in being created or updated!`
        })
      } catch (err) {
        logger.log({
          level: 'ERROR',
          description: `Error creating or updating challenge: ${err}`
        })
      }
    }
    const values = {
      type: 'Recipe',
      difficulty: recipeData?.recipe.difficulty,
      recipeId,
      ...createOrUpdateChallengeState
    }
    createUpdateChallengeApi(values)
    console.log('values', values)
  }, [
    createOrUpdateChallenge,
    createOrUpdateChallengeState,
    recipeData,
    recipeId
  ])
  console.log('data', recipeData, createOrUpdateChallengeState)

  if (recipeError) return <h1>`Error! ${recipeError.message}`</h1>
  if (recipeLoading) return <h1>'Loading...'</h1>

  return (
    <CreateUpdateChallengeDispatch.Provider
      value={dispatchCreateOrUpdateChallengeState}
    >
      <h1>Title: {recipeData.recipe.title}</h1>
      <h2>Meal Type: {recipeData.recipe.mealType}</h2>
      <h2>Difficulty: {recipeData.recipe.difficulty}</h2>
      <h2>Budget: {recipeData.recipe.cost}</h2>
      <h3>Ingredients</h3>
      <div
        onClick={() =>
          dispatchCreateOrUpdateChallengeState({ type: 'ingredients' })
        }
      >
        {recipeData.recipe.ingredients.map((ingredient: string) => (
          <p>{ingredient}</p>
        ))}
      </div>
      <h4>Method</h4>
      <div
        onClick={() => dispatchCreateOrUpdateChallengeState({ type: 'method' })}
      >
        {recipeData.recipe.method.map((step: string) => (
          <li>{step}</li>
        ))}
      </div>
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
    </CreateUpdateChallengeDispatch.Provider>
  )
}

export default withRouter(Recipe)

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

import {
  DispatchCreateOrUpdateChallengeState,
  CreateUpdateChallengeState,
  ActionType,
  ImageUrls
} from '../containers/types'

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
  action: ActionType
): CreateUpdateChallengeState {
  switch (action.type) {
    case 'Ingredients':
      return {
        ...state,
        sectionsCompleted: state.sectionsCompleted.concat(['Ingredients'])
      }
    case 'Method':
      return {
        ...state,
        sectionsCompleted: state.sectionsCompleted.concat(['Method'])
      }
    case 'SharedFriendsImage':
      return {
        ...state,
        sectionsCompleted: state.sectionsCompleted.concat([
          'SharedFriendsImage'
        ])
      }
    case 'SharedRecipe':
      return {
        ...state,
        sectionsCompleted: state.sectionsCompleted.concat(['SharedRecipe'])
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
  // TODO - find a way to make sure they can add each item to the
  // array once only!
  const INITIAL_CREATE_UPDATE_CHALLENGE_STATE: CreateUpdateChallengeState = {
    sectionsCompleted: []
  }
  // State
  const [
    createOrUpdateChallengeState,
    dispatchCreateOrUpdateChallengeState
  ] = useReducer(
    reducerCreateOrUpdateChallengeState,
    INITIAL_CREATE_UPDATE_CHALLENGE_STATE
  )
  const [takePhoto, setTakePhoto] = useState(false)
  const [sharedFriendsImage, setSharedFriendsImage] = useState()
  const [getChallengeQuery, setGetChallengeQuery] = useState(
    INITIAL_CREATE_UPDATE_CHALLENGE_STATE
  )

  // Apollo
  const [createOrUpdateChallengeMutation] = useMutation(CREATE_UPDATE_CHALLENGE)
  const {
    loading: recipeLoading,
    error: recipeError,
    data: recipeData
  } = useQuery(GET_RECIPE, {
    variables: { recipeId }
  })
  const { error: challengeError, data: challengeData } = useQuery(
    GET_CHALLENGE,
    {
      variables: { recipeId }
    }
  )

  useEffect(() => {
    if (challengeError) {
      logger.log({
        level: 'ERROR',
        description: `Error querying for challenge: ${challengeError}`
      })
    }
    setGetChallengeQuery(challengeData?.data.challenge.sectionsCompleted)
    setSharedFriendsImage(challengeData?.data.challenge.sharedFriendsImages)
  }, [challengeData, challengeError])

  useEffect(() => {
    async function createUpdateChallengeApi(values: any) {
      try {
        const challenge = await createOrUpdateChallengeMutation({
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
      ...createOrUpdateChallengeState,
      ...sharedFriendsImage
    }
    createUpdateChallengeApi(values)
  }, [
    createOrUpdateChallengeMutation,
    createOrUpdateChallengeState,
    recipeData,
    recipeId,
    sharedFriendsImage
  ])

  function handleSharedFriendsImage(imageUrls: ImageUrls) {
    setSharedFriendsImage(imageUrls)
  }

  const ingredientsCompleted =
    createOrUpdateChallengeState.sectionsCompleted.includes('Ingredients') ||
    getChallengeQuery?.sectionsCompleted.includes('Ingredients')
  const methodCompleted =
    createOrUpdateChallengeState.sectionsCompleted.includes('Method') ||
    getChallengeQuery?.sectionsCompleted.includes('Method')
  const sharedFriendsImageCompleted =
    createOrUpdateChallengeState.sectionsCompleted.includes(
      'SharedFriendsImage'
    ) || getChallengeQuery?.sectionsCompleted.includes('SharedFriendsImage')
  const sharedRecipeCompleted =
    createOrUpdateChallengeState.sectionsCompleted.includes('SharedRecipe') ||
    getChallengeQuery?.sectionsCompleted.includes('SharedRecipe')

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
      {/* TODO -  1) add styling */}
      {ingredientsCompleted ? (
        <span>
          <p>You've completed this section!</p>
        </span>
      ) : (
        <div
          onClick={() =>
            dispatchCreateOrUpdateChallengeState({ type: 'Ingredients' })
          }
        >
          {recipeData.recipe.ingredients.map((ingredient: string) => (
            <p>{ingredient}</p>
          ))}
        </div>
      )}
      <h4>Method</h4>
      {methodCompleted ? (
        <span>
          <p>You've completed this section!</p>
        </span>
      ) : (
        <div
          onClick={() =>
            dispatchCreateOrUpdateChallengeState({ type: 'Method' })
          }
        >
          {recipeData.recipe.method.map((step: string) => (
            <li>{step}</li>
          ))}
        </div>
      )}
      {sharedFriendsImageCompleted ? (
        <div>
          <p>You've completed this section! Take a look at your photo!</p>
          <img
            src={sharedFriendsImage.standardResolution}
            alt='Image of friends'
          ></img>
        </div>
      ) : (
        <div>
          {takePhoto ? (
            <LiveFaceDetect
              handleSharedFriendsImage={handleSharedFriendsImage}
            />
          ) : (
            <button onClick={() => setTakePhoto(true)}>Take photo!</button>
          )}
        </div>
      )}
      {/* TODO - maybe get quote from the recipe? */}
      {sharedRecipeCompleted ? (
        <span>
          <p>You've completed this section!</p>
        </span>
      ) : (
        <FbInitAndToken>
          {() => (
            <FbUserShare
              href={`${process.env.CLIENT_URI}${router.asPath}`}
              quote='This is an amazing recipe!'
            />
          )}
        </FbInitAndToken>
      )}
    </CreateUpdateChallengeDispatch.Provider>
  )
}

export default withRouter(Recipe)

import React, {
  useState,
  useReducer,
  createContext,
  useEffect,
  useContext,
  useRef
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
  SharedFriendsImage
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
  console.log('state in dispatch', state)

  switch (action.type) {
    case 'Ingredients':
      return {
        sectionsCompleted: state.sectionsCompleted.concat(['Ingredients'])
      }
    case 'Method':
      return {
        sectionsCompleted: state.sectionsCompleted.concat(['Method'])
      }
    case 'SharedFriendsImage':
      return {
        sectionsCompleted: state.sectionsCompleted.concat([
          'SharedFriendsImage'
        ])
      }
    case 'SharedRecipe':
      return {
        sectionsCompleted: state.sectionsCompleted.concat(['SharedRecipe'])
      }
    default:
      throw new Error('Failed to update recipe challenge state!')
  }
}

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

const CreateUpdateChallengeDispatch = createContext<
  DispatchCreateOrUpdateChallengeState | undefined
>(undefined)

const INITIAL_CREATE_UPDATE_CHALLENGE_STATE: CreateUpdateChallengeState = {
  sectionsCompleted: []
}
const INITIAL_SHARED_FRIENDS_IMAGE_STATE: SharedFriendsImage = {
  standardResolution: '',
  lowResSharedFriendsImage: ''
}

const Recipe = ({ router }: { router: Router }) => {
  const firstUpdate = useRef(true)
  // TODO - find a way to make sure they can add each item to the
  // array once only!
  // State
  const [
    createOrUpdateChallengeState,
    dispatchCreateOrUpdateChallengeState
  ] = useReducer(
    reducerCreateOrUpdateChallengeState,
    INITIAL_CREATE_UPDATE_CHALLENGE_STATE
  )
  const [challengeQueryState, setChallengeQueryState] = useState(
    INITIAL_CREATE_UPDATE_CHALLENGE_STATE
  )
  const [sharedFriendsImage, setSharedFriendsImage] = useState(
    INITIAL_SHARED_FRIENDS_IMAGE_STATE
  )
  const [showSharedFriendsImage, setShowSharedFriendsImage] = useState('')
  const [takePhoto, setTakePhoto] = useState(false)
  console.group('STATE')
  console.log('@@@@createOrUpdateChallengeState', createOrUpdateChallengeState)
  console.log('@@@@sharedFriendsImage', sharedFriendsImage)
  console.log('@@@@challengeQueryState', challengeQueryState)
  console.groupEnd()
  const typedTitleId = router.query['title-id'] as string
  const recipeId = parseInt(typedTitleId.split('-')[1])

  // Apollo
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
  const [createOrUpdateChallengeMutation] = useMutation(CREATE_UPDATE_CHALLENGE)
  console.group('APOLLO')
  console.log('!!!!!recipeData', recipeData)
  console.log('!!!!!challengeData', challengeData)
  console.groupEnd()

  // To set the state if there's data for the challenge
  useEffect(() => {
    if (challengeError) {
      logger.log({
        level: 'ERROR',
        description: `Error querying for challenge: ${challengeError}`
      })
      return
    }
    if (challengeData == undefined || challengeData.challenge == null) {
      console.log('3)INSIDE IF challengeData in use effect', challengeData)
      return
    }
    console.log('3) challengeData in use effect', challengeData)

    setChallengeQueryState({
      sectionsCompleted: challengeData.challenge.sectionsCompleted
    })
    const sharedFriendsImageState = challengeData.challenge.sharedFriendsImages
      ? challengeData.challenge.sharedFriendsImages.standardResolution
      : ''
    setShowSharedFriendsImage(sharedFriendsImageState)
  }, [challengeData, challengeError])

  // I'm using this to update the challenge on each update but may
  // I can use a different method
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
          description: `Challenge ${challenge.data.createOrUpdateChallenge.id} by userid in being created or updated!`
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
      difficulty: router.query.difficulty,
      recipeId,
      ...createOrUpdateChallengeState,
      ...sharedFriendsImage
    }
    if (firstUpdate.current == false) {
      console.log('1)$$$$$inside firstUp date FALSE')

      createUpdateChallengeApi(values)
    } else {
      console.log('1)######inside firstUpdate TRUE')
      firstUpdate.current = false
      return
    }
  }, [
    createOrUpdateChallengeMutation,
    createOrUpdateChallengeState,
    router.query.difficulty,
    recipeId,
    sharedFriendsImage
  ])

  function handleSharedFriendsImage(sharedFriendsImage: SharedFriendsImage) {
    setSharedFriendsImage(sharedFriendsImage)
  }
  console.log('2) challengeQueryState b/f checks', challengeQueryState)

  const ingredientsCompleted =
    createOrUpdateChallengeState.sectionsCompleted.includes('Ingredients') ||
    challengeQueryState.sectionsCompleted.includes('Ingredients')
  const methodCompleted =
    createOrUpdateChallengeState.sectionsCompleted.includes('Method') ||
    challengeQueryState.sectionsCompleted.includes('Method')
  const sharedFriendsImageCompleted =
    createOrUpdateChallengeState.sectionsCompleted.includes(
      'SharedFriendsImage'
    ) || challengeQueryState.sectionsCompleted.includes('SharedFriendsImage')
  const sharedRecipeCompleted =
    createOrUpdateChallengeState.sectionsCompleted.includes('SharedRecipe') ||
    challengeQueryState.sectionsCompleted.includes('SharedRecipe')

  if (recipeError) return <h1>Error! {recipeError.message}</h1>
  if (recipeLoading) return <h1>Loading...</h1>

  return (
    <CreateUpdateChallengeDispatch.Provider
      value={dispatchCreateOrUpdateChallengeState}
    >
      {console.log('4) %%%%inside render%%%%')}
      <h1>You've choosen {recipeData.recipe.id}</h1>
      <h1>Title: {recipeData.recipe.title}</h1>
      <h2>Meal Type: {recipeData.recipe.mealType}</h2>
      <h2>Difficulty: {recipeData.recipe.difficulty}</h2>
      <h2>Budget: {recipeData.recipe.cost}</h2>
      <h3>Ingredients</h3>
      {/* TODO -  1) add styling 2) make sure the non-signed in user doesn't have access to clicking on the items */}
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
          <img src={showSharedFriendsImage} alt='Image of friends'></img>
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

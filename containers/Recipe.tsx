import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { withRouter, Router } from 'next/router'
import logger from '../utils/logger'
import useCheckSigninStatus from '../hooks/useCheckSigninStatus'
import { Box, Heading, Button, List, Text, Paragraph } from 'grommet'
import styled from 'styled-components'

import FbUserShare from '../components/FbUserShare'
import FbInitAndToken from '../containers/FbInitParent'
import UnAuthRecipeDeets from '../components/UnAuthRecipeDeets'

import {
  CreateUpdateChallengeState,
  CreateUpdateMutationValues,
  RecipeData,
  RecipeVars
} from '../containers/types'

const Complete = styled(Box)`
  border: #00ff37;
  background-color: rgba(0, 255, 55, 0.3);
  padding-left: 12px;
  padding-right: 12px;
`

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
      videoUrl
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
        lowResSharedFriendsImage
      }
      userProfileId
      recipeId
    }
  }
`

const CREATE_UPDATE_CHALLENGE = gql`
  mutation createOrUpdateChallenge($challengeInput: ChallengeInput) {
    createOrUpdateChallenge(challengeInput: $challengeInput) {
      id
      sectionsCompleted
      sharedFriendsImages {
        standardResolution
        lowResSharedFriendsImage
      }
      userProfileId
      recipeId
    }
  }
`

const INITIAL_CREATE_UPDATE_CHALLENGE_STATE: CreateUpdateChallengeState = {
  sectionsCompleted: [],
  standardResolution: '',
  lowResSharedFriendsImage: ''
}

const Recipe = ({ router }: { router: Router }) => {
  // Parse the query
  const recipeId: number = parseInt(router.query.recipeId as string)
  const recipeTitle = router.query.title
  // Custom hooks
  const { signedIn } = useCheckSigninStatus()
  // State
  const [challengeState, setChallengeState] = useState(
    INITIAL_CREATE_UPDATE_CHALLENGE_STATE
  )
  const [takePhoto, setTakePhoto] = useState(false)
  // Apollo
  const {
    loading: recipeLoading,
    error: recipeError,
    data: recipeData
  } = useQuery<RecipeData, RecipeVars>(GET_RECIPE, {
    variables: { recipeId }
  })
  const {
    error: challengeError,
    data: challengeData,
    loading: challengeLoading
  } = useQuery(GET_CHALLENGE, {
    variables: { recipeId }
  })
  const [createOrUpdateChallengeMutation] = useMutation(
    CREATE_UPDATE_CHALLENGE,
    {
      refetchQueries: [
        {
          query: GET_CHALLENGE,
          variables: { recipeId }
        }
      ]
    }
  )

  // To set the state if there's data for the challenge
  useEffect(() => {
    if (challengeError) {
      logger.log({
        level: 'ERROR',
        description: `Error querying for challenge: ${challengeError}`
      })
      return
    }
    if (challengeData == undefined || challengeData.challenge == null) return

    setChallengeState({
      sectionsCompleted: challengeData.challenge.sectionsCompleted,
      standardResolution:
        challengeData.challenge.sharedFriendsImages.standardResolution,
      lowResSharedFriendsImage:
        challengeData.challenge.sharedFriendsImages.lowResSharedFriendsImage
    })
  }, [challengeData, challengeError])

  const values: CreateUpdateMutationValues = {
    type: 'Recipe',
    difficulty: recipeData?.recipe.difficulty,
    recipeId,
    ...challengeState
  }

  async function createUpdateChallengeApi(values: any, section: string[]) {
    try {
      if (challengeState.sectionsCompleted.includes(section[0])) return

      values.sectionsCompleted = values.sectionsCompleted.concat(section)
      const challenge = await createOrUpdateChallengeMutation({
        variables: {
          challengeInput: values
        }
      })
      logger.log({
        level: 'INFO',
        description: `Challenge ${challenge.data.createOrUpdateChallenge.id} by userid in being created or updated!`
      })
      setChallengeState({
        sectionsCompleted:
          challenge.data.createOrUpdateChallenge.sectionsCompleted,
        standardResolution:
          challenge.data.createOrUpdateChallenge.sharedFriendsImages
            .standardResolution,
        lowResSharedFriendsImage:
          challengeData.challenge.sharedFriendsImages.lowResSharedFriendsImage
      })
    } catch (err) {
      logger.log({
        level: 'ERROR',
        description: `Error creating or updating challenge: ${err}`
      })
    }
  }

  function handleCreateUpdateChallengeApi(
    values: CreateUpdateMutationValues,
    section: Array<string>
  ) {
    createUpdateChallengeApi(values, section)
  }

  const ingredientsCompleted = challengeState.sectionsCompleted.includes(
    'Ingredients'
  )
  const methodCompleted = challengeState.sectionsCompleted.includes('Method')
  const sharedFriendsImageCompleted = challengeState.sectionsCompleted.includes(
    'SharedFriendsImage'
  )
  const sharedRecipeCompleted = challengeState.sectionsCompleted.includes(
    'SharedRecipe'
  )
  if (recipeLoading) return <h1>Loading...</h1>
  if (recipeData == undefined) {
    return <h1>There was an error loading the recipe. Try again!</h1>
  }
  if (recipeData.recipe.title !== recipeTitle) {
    return <h1>The url you enter is incorrect!</h1>
  }
  if (recipeError != undefined && recipeError) {
    return <h1>Error! {recipeError.message}</h1>
  }
  if (!signedIn) {
    return <UnAuthRecipeDeets recipe={recipeData.recipe} />
  }

  const IngredientsSection = ingredientsCompleted ? Complete : Box
  const MethodSection = methodCompleted ? Complete : Box

  return (
    <Box a11yTitle='recipe container' align='center' justify='center'>
      <Box
        a11yTitle='recipe title and image container'
        background={{
          image: `url(${recipeData.recipe.standardResolution})`,
          size: 'cover'
        }}
        pad='small'
        width='640px'
        height='480px'
        margin={{
          top: '50px'
        }}
        direction='row'
      >
        <Heading
          alignSelf='end'
          className='impactFont'
          color='white'
          size='1'
          textAlign='end'
        >
          {recipeData.recipe.title}
        </Heading>
      </Box>
      <Box>
        <Heading
          a11yTitle='meal type heading'
          className='impactFont'
          level='2'
          margin='small'
        >
          Meal Type: {recipeData.recipe.mealType}
        </Heading>
        <Heading
          a11yTitle='difficulty heading'
          className='impactFont'
          level='2'
          margin='small'
        >
          Difficulty: {recipeData.recipe.difficulty}
        </Heading>
        <Heading
          a11yTitle='cost heading'
          className='impactFont'
          level='2'
          margin='small'
        >
          Budget: {recipeData.recipe.cost}
        </Heading>
      </Box>
      <Heading
        a11yTitle='ingredients heading'
        alignSelf='start'
        className='impactFont'
        level='2'
        margin={{
          top: '25px',
          bottom: '0px'
        }}
      >
        Ingredients
      </Heading>
      {ingredientsCompleted ? (
        <Text
          a11yTitle='ingredient completion text'
          size='xsmall'
          textAlign='center'
        >
          <i>You've completed this section!</i>
        </Text>
      ) : null}
      <IngredientsSection
        a11yTitle='recipe ingredient container'
        align='center'
        justify='center'
        width='medium'
        pad='medium'
      >
        <List
          a11yTitle='list of recipe ingredients'
          data={recipeData.recipe.ingredients}
        />
        <Button
          a11yTitle='complete ingredients section'
          alignSelf='center'
          fill='horizontal'
          label='COMPLETE INGREDIENTS'
          margin={{
            bottom: '10px',
            top: '30px'
          }}
          onClick={() =>
            handleCreateUpdateChallengeApi(values, ['Ingredients'])
          }
          primary={true}
          type='button'
        />
        <Text a11yTitle='ingredient hint text' size='xsmall' textAlign='center'>
          <i>Click on button when you got all ingredients to earn points!</i>
        </Text>
      </IngredientsSection>
      <Heading
        a11yTitle='method heading'
        alignSelf='start'
        className='impactFont'
        level='2'
        margin={{
          top: '25px'
        }}
      >
        Method
      </Heading>
      {methodCompleted ? (
        <Text
          a11yTitle='ingredient completion text'
          size='xsmall'
          textAlign='center'
        >
          <i>You've completed this section!</i>
        </Text>
      ) : null}
      <MethodSection
        a11yTitle='recipe method container'
        align='center'
        justify='center'
        width='medium'
        pad='medium'
      >
        <List
          a11yTitle='list of steps for recipe method'
          data={recipeData.recipe.method}
        />
        <Button
          a11yTitle='completed method section'
          alignSelf='center'
          fill='horizontal'
          label='COMPLETE METHOD'
          margin={{
            bottom: '10px',
            top: '30px'
          }}
          onClick={() => handleCreateUpdateChallengeApi(values, ['Method'])}
          primary={true}
          type='button'
        />
        <Text a11yTitle='ingredient hint text' size='xsmall' textAlign='center'>
          <i>
            Click on button when you've completed making the meal to earn
            points!
          </i>
        </Text>
      </MethodSection>
      <Box
        a11yTitle='sharing section container'
        align='center'
        justify='center'
        width='medium'
        margin={{
          bottom: '20px'
        }}
        pad='medium'
      >
        <Heading
          a11yTitle='sharing section heading'
          alignSelf='start'
          className='impactFont'
          level='2'
          margin={{
            top: '25px',
            bottom: '0px'
          }}
        >
          Sharing
        </Heading>
        {sharedFriendsImageCompleted ? (
          <div>
            <p>You've completed this section! Take a look at your photo!</p>
            <img
              src={challengeState.standardResolution}
              alt='Image of friends'
            ></img>
          </div>
        ) : (
          <div>
            {takePhoto ? (
              <LiveFaceDetect
                handleCreateUpdateChallengeApi={handleCreateUpdateChallengeApi}
                values={values}
              />
            ) : (
              <>
                <Paragraph alignSelf='center'>
                  Take a photo of yourself with the delicious meal you just
                  made, sharing it on the No Meat May Facebook Group and earn
                  some points!
                </Paragraph>
                <Box
                  a11yTitle='sharing section container'
                  align='center'
                  justify='center'
                  margin={{
                    bottom: '20px'
                  }}
                >
                  <Button
                    a11yTitle='open up camera button'
                    alignSelf='center'
                    data-testid='button'
                    fill='horizontal'
                    hoverIndicator={{ color: 'white' }}
                    label='TAKE PHOTO'
                    margin={{ top: '0px', bottom: '20px' }}
                    primary={true}
                    type='button'
                    onClick={() => setTakePhoto(true)}
                  />
                </Box>
              </>
            )}
          </div>
        )}
        {sharedRecipeCompleted ? (
          <span>
            <p>You've completed this section!</p>
          </span>
        ) : (
          <FbInitAndToken>
            {() => (
              <>
                <Paragraph alignSelf='center'>
                  Share the recipe to your Facebook wall to get more people
                  interested in trying out these delicious meal and you'll get
                  points!
                </Paragraph>
                <FbUserShare
                  href={`${process.env.CLIENT_URL}/${router.asPath}`}
                  quote='By eating less animal products, or going meat free, you can protect our planet, your health, and save living beings, both human and animal from suffering.'
                  handleCreateUpdateChallengeApi={
                    handleCreateUpdateChallengeApi
                  }
                  values={values}
                />
              </>
            )}
          </FbInitAndToken>
        )}
      </Box>
    </Box>
  )
}

export default withRouter(Recipe)

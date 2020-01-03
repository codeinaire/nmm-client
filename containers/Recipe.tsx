import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { withRouter, Router } from 'next/router'
import FbUserShare from '../components/FbUserShare'
import FbInitAndToken from '../containers/FbInitParent'

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

const Recipe = ({ recipeId, router }: { recipeId: number; router: Router }) => {
  const [takePhoto, setTakePhoto] = useState(false)
  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: { recipeId }
  })

  if (error) return <h1>`Error! ${error.message}`</h1>
  if (loading) return <h1>'Loading...'</h1>

  return (
    <>
      <h1>Title: {data.recipe.title}</h1>
      <h2>Meal Type: {data.recipe.mealType}</h2>
      <h2>Difficulty: {data.recipe.difficulty}</h2>
      <h2>Budget: {data.recipe.cost}</h2>
      <h3>Ingredients</h3>
      {data.recipe.ingredients.map((ingredient: string) => (
        <p>{ingredient}</p>
      ))}
      <h4>Method</h4>
      {data.recipe.method.map((step: string) => (
        <li>{step}</li>
      ))}
      <div>{takePhoto ? <LiveFaceDetect /> : null}</div>
      <button onClick={() => setTakePhoto(true)}>Take photo!</button>
      {console.log('router.route', router.asPath)}
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

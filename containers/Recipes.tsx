import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'

const GET_RECIPES = gql`
  {
    recipes {
      id
      title
      difficulty
      cost
      mealType
      hashtags
      lowResolution
    }
  }
`
export default function Recipes() {
  const { loading, error, data } = useQuery(GET_RECIPES)

  if (loading) return <h1>'Loading...'</h1>
  if (error) return <h1>`Error! ${error.message}`</h1>

  return (
    <div>
      <h2>testing</h2>
      {data.recipes.map((recipe: any) => (
        <div key={recipe.title}>
          <Link
            href={{
              pathname: '/recipe/[title-id]',
              query: { difficulty: recipe.difficulty, recipeId: recipe.id }
            }}
            as={`/recipe/${recipe.title}-${recipe.id}`}
          >
            <a>
              <p>
                {recipe.id} {recipe.title} {recipe.mealType}
              </p>
              <img
                src={recipe.lowResolution}
                alt='picture of food'
                width='170'
                height='170'
              ></img>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

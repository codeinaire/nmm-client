import React from 'react'
import { Recipe } from '../containers/types'
import SignUp from '../containers/SignUp'

export default function UnAuthRecipeDeets({ recipe }: { recipe: Recipe }) {
  return (
    <>
      <h1>You've choosen {recipe.id}</h1>
      <h1>Title: {recipe.title}</h1>
      <h2>Meal Type: {recipe.mealType}</h2>
      <h2>Difficulty: {recipe.difficulty}</h2>
      <h2>Budget: {recipe.cost}</h2>
      <h3>Ingredients</h3>
      <div>
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <p key={index}>{ingredient}</p>
        ))}
      </div>
      <h3>Method</h3>
      <div>
        {recipe.method.map((step: string, index: number) => (
          <li key={index}>{step}</li>
        ))}
      </div>
      <h1>
        If you want access to all the recipes and earn points for cool stuff
        sign up now!
      </h1>
      <SignUp />
    </>
  )
}

import React from 'react'
import { useRouter } from 'next/router'
import Recipe from '../../../containers/Recipe'

export default function RecipePage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>You've choosen recipe {id}</h1>
      <Recipe recipeId={parseInt(id as string)} />
    </div>
  )
}

import React from 'react'
import { Box } from 'grommet'
import AllRecipesByMeal from '../containers/AllRecipesByMeal'

export default function AllRecipes() {
  return (
    <Box align='center' direction='column' justify='center'>
      <AllRecipesByMeal />
    </Box>
  )
}

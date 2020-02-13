export interface CreateUpdateChallengeState {
  sectionsCompleted: Array<string>
  standardResolution: string
  lowResSharedFriendsImage: string
}

export interface ActionType {
  type: string
}

export type HandleCreateUpdateChallengeApi = (
  values: CreateUpdateMutationValues,
  section: Array<string>,
  sharedFriendsImage?: SharedFriendsImage
) => void

interface SharedFriendsImage {
  standardResolution: string
  lowResSharedFriendsImage: string
}

export interface CreateUpdateMutationValues {
  type: string
  difficulty: string
  recipeId: number
  sectionsCompleted: Array<string>
  lowResSharedFriendsImage: string
  standardResolution: string
}

export interface RecipeData {
  recipe: Recipe
}

export interface RecipeVars {
  recipeId: number
}

export interface Recipe {
  id: number
  title: string
  difficulty: DifficultyEnum
  cost: CostEnum
  mealType: MealTypeEnum
  hashtags: [string]
  ingredients: [string]
  method: [string]
  lowResolution?: string
  recipeAttribution?: RecipeAttribution
  standardResolution?: string
}

export interface RecipeAttribution {
  id: number
  name: string
  website: string
  email: string
  facebook: string
  instagram: string
  twitter: string
}

enum DifficultyEnum {
  Easy,
  Medium,
  Hard
}

enum CostEnum {
  Budget,
  Moderate,
  Expensive
}

enum MealTypeEnum {
  Breakfast,
  Lunch,
  Dinner,
  Snack
}

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

export interface DeleteRecipeType {
  recipeTitleOrId: string
  deleteSecret: string
}

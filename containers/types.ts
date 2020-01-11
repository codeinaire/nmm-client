export interface CreateUpdateChallengeState {
  sectionsCompleted: Array<string>
}

export interface ActionType {
  type: string
}

export interface SharedFriendsImage {
  standardResolution: string
  lowResSharedFriendsImage: string
}

export type DispatchCreateOrUpdateChallengeState = (action: ActionType) => void

export type HandleSharedFriendsImage = (
  sharedFriendsImage: SharedFriendsImage
) => void

export type HandleCreateUpdateChallengeApi = (
  values: CreateUpdateMutationValues,
  section: Array<string>
) => void

export interface CreateUpdateMutationValues {
  type: string
  difficulty: string
  recipeId: number
  sectionsCompleted: Array<string>
  lowResSharedFriendsImage: string
  standardResolution: string
}

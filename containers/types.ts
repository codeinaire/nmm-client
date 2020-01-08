export interface CreateUpdateChallengeState {
  sectionsCompleted: Array<string>
  lowsResSharedFriendsImage: string
  standardResolution: string
}

export interface ActionType {
  type: string
}

export type ImageUrls = {
  standardResolution: string
  lowsResSharedFriendsImage: string
}

export type DispatchCreateOrUpdateChallengeState = (action: ActionType) => void

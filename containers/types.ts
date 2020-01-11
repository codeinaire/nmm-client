export interface CreateUpdateChallengeState {
  sectionsCompleted: Array<string>
}

export interface ActionType {
  type: string
}

export type SharedFriendsImage = {
  standardResolution: string
  lowResSharedFriendsImage: string
}

export type DispatchCreateOrUpdateChallengeState = (action: ActionType) => void

export type handleSharedFriendsImage = (
  sharedFriendsImage: SharedFriendsImage
) => void

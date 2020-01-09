export interface CreateUpdateChallengeState {
  sectionsCompleted: Array<string>
}

export interface ActionType {
  type: string
}

export type ImageUrls = {
  standardResolution: string
  lowsResSharedFriendsImage: string
}

export type DispatchCreateOrUpdateChallengeState = (action: ActionType) => void

export type handleSharedFriendsImage = (imageUrls: ImageUrls) => void

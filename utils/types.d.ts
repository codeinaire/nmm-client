

export interface ISignUpArgs {
  email: string;
  password: string;
  username: string;
  user_metadata: IUserMetadata
}

interface IUserMetadata {
  motivations: string;
  // other user data like goal?
}

export interface ISignInArgs extends IBaseSignInArgs {
  email: string;
  password: string;
}

export interface IBaseSignInArgs {
  type: SignInTypes
}

export type SignInFunction = (arg0: T) => T extends true ? IBaseSignInArgs : ISignInArgs;

enum SignInTypes {
  auth0 = "AUTH0",
  social = "SOCIAL"
}
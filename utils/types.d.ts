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

enum SignInTypes {
  auth0 = "AUTH0",
  social = "SOCIAL"
}
import React from 'react';
import { signUp, signIn } from '../utils/auth';
import { SignInTypes } from '../utils/types';

const AuthTest = () => {

  return (
    <div>
      <h3>Sign Me up!!</h3>
      <button onClick={() => {
        signUp({
          email: 'test@user.com',
          password: 'Aoeui1234',
          username: 'testUser',
          user_metadata: {
            motivations: 'love,peace,happiness'
          }
        })
      }}>SIGN UP</button>
      <button onClick={() => {
        signIn(SignInTypes.auth0, 'test@user.com', 'Aoeui1234')
      }}>AUTH0 SignIn</button>
      <button onClick={() => {
        signIn(SignInTypes.auth0)
      }}>Facebook signUp</button>
    </div>
  )
}

export default AuthTest;
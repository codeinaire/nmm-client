import React from 'react';

import AuthTest from '../components/AuthTest';
import SignUp from '../containers/SignUp';
import SignIn from '../containers/SignIn';

export default function Home() {

  return(
    <div>
      <h1>Welcome Home!</h1>
      <AuthTest />
      <SignIn />
      <br/>
      <SignUp />
    </div>
  )
}

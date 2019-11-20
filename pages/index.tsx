import React from 'react';

import RecipeTest from '../components/RecipeTest';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Modal from '../containers/Modal';

const modalProps = {
  triggerText: "Launch the Modal!"
};
const modalContent = (
  <React.Fragment>
    <p>
      Press <code>Esc</code> or click Outside the Modal to exit.
    </p>
    <p>
      Pressing Return also exits the Modal if you haven't changed the focus!
    </p>
  </React.Fragment>
);

export default function Home() {
  return(
    <div>
      <h1>Welcome Home!</h1>
      <RecipeTest />
      <SignIn />
      <SignUp />
      <Modal modalProps={modalProps} modalContent={modalContent}/>
    </div>
  )
}

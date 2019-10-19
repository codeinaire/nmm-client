import React from 'react';
import { object, string } from 'yup';
import { signIn } from '../utils/auth';

import DynamicForm from '../components/DynamicForm';

import { OnSubmitObject } from '../components/types';
import { SignInTypes } from '../utils/types';

export default function SignIn() {
  const formTest = [
    {
      type: 'email',
      name: 'email',
      errorMessageId: 'emailError',
      required: 'true',
      autocomplete: 'on',
      displayName: 'Email'
    },
    {
      type: 'password',
      name: 'password',
      errorMessageId: 'passwordError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'Password'
    }
  ]

  const validationSchema = object().shape({
    email: string()
      .email('Invalid email')
      .required('Please enter your email!'),
    password: string()
      .min(8, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Please enter your password')
  })

  const onSubmit = (values: OnSubmitObject) => {
    console.log('This is values', values);
    signIn(SignInTypes.auth0, values.email, values.password)
  }

  return (
    <div>
      <p>Please sign in</p>
      <DynamicForm
        formTest={formTest}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      />
    </div>
  )
}
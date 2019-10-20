import React from 'react';
import { object, string } from 'yup';
import { signUp } from '../utils/auth';

import DynamicForm from '../components/DynamicForm';

import { OnSubmitObject } from '../components/types';

export default function SignIn() {
  const formTest = [
    {
      type: 'email',
      name: 'email',
      errorMessageId: 'emailError',
      required: 'false',
      autocomplete: 'on',
      displayName: 'Email'
    },
    {
      type: 'password',
      name: 'password',
      errorMessageId: 'passwordError',
      required: 'false',
      autocomplete: 'off',
      displayName: 'Password'
    },
    {
      type: 'text',
      name: 'username',
      errorMessageId: 'usernameError',
      required: 'false',
      autocomplete: 'off',
      displayName: 'Username'
    }
  ]
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])([^\s]){10,16}$/;
  const validationSchema = object().shape({
    email: string()
      .email('Invalid email')
      .trim()
      .required('Please enter your email!'),
    password: string()
      .min(10, 'Too Short!')
      .matches(PASSWORD_REGEX, 'Password must be at least 10 characters long with one (1) upper case, one (1) lower case, and one(1) special character(!@#$%^&*)')
      .trim()
      .required('Please enter your password!'),
    username: string()
      .trim()
      .max(15, 'Too Long!')
      .required('Please enter a username!')
  })

  const onSubmit = (values: OnSubmitObject) => {
    console.log('VALUES', values);
    signUp({
      email: values.email,
      password: values.password,
      username: values.username
    })
  }

  const submitType = 'Sign Up!'

  return (
    <div>
      <p>Please sign up</p>
      <DynamicForm
        formTest={formTest}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        submitType={submitType}
      />
    </div>
  )
}
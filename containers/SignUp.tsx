import React from 'react'
import { object, string } from 'yup'
import { signUp } from '../utils/auth'

import DynamicForm from '../components/DynamicForm'

import { FormikActions } from 'formik'
import { OnSubmitObject } from '../components/types'

export default function SignIn() {
  const formInput = [
    {
      type: 'email',
      name: 'email',
      errorMessageId: 'emailError',
      required: false,
      autocomplete: 'on',
      displayName: 'Email'
    },
    {
      type: 'password',
      name: 'password',
      errorMessageId: 'passwordError',
      required: false,
      autocomplete: 'off',
      displayName: 'Password'
    },
    {
      type: 'text',
      name: 'username',
      errorMessageId: 'usernameError',
      required: false,
      autocomplete: 'off',
      displayName: 'Username'
    }
  ]
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])([^\s]){10,16}$/
  const USERNAME_REGEX = /^[a-zA-Z0-9_+-.!#$'^`~@]*$/
  const validationSchema = object().shape({
    email: string()
      .email('Invalid email!')
      .trim()
      .required('Please enter an email!'),
    password: string()
      .min(10, 'Too short!')
      .matches(
        PASSWORD_REGEX,
        'Password must be at least 10 characters long with one (1) upper case, one (1) lower case, and one(1) special character(!@#$%^&*)'
      )
      .trim()
      .required('Please enter a password!'),
    username: string()
      .max(15, 'Too long!')
      .matches(USERNAME_REGEX, 'Username cannot contain any spaces.')
      .trim()
      .required('Please enter a username!')
  })

  const onSubmit = (
    values: OnSubmitObject,
    { resetForm, setSubmitting, setStatus}: FormikActions<OnSubmitObject>
  ) => {
    try {
      signUp({
        email: values.email,
        password: values.password,
        username: values.username
      })
      resetForm()
      setStatus({ openModal: true, success: true })
    } catch (error) {
      resetForm()
      setStatus({ openModal: true, success: false })
      setSubmitting(false)
    }
  }

  const submitType = 'Sign Up!'
  const failMessage = 'Sign Up failed! Please try again!'
  const successMessage = 'You suceeded in Signing Up! Yay!'

  return (
    <div>
      <p>Please sign up</p>
      <DynamicForm
        failMessage={failMessage}
        formInput={formInput}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        submitType={submitType}
        successMessage={successMessage}
      />
    </div>
  )
}

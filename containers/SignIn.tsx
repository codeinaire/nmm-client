import React from 'react'
import { object, string } from 'yup'
import { FormikActions } from 'formik'
import { signIn } from '../utils/auth'
import DynamicForm from '../components/DynamicForm'
import Link from 'next/link'

import { OnSubmitObject } from '../components/types'
import { SignInTypes } from '../utils/types'

export default function SignIn() {

  const formInput = [
    {
      type: 'email',
      name: 'email',
      errorMessageId: 'emailError',
      required: true,
      autocomplete: 'on',
      displayName: 'Email'
    },
    {
      type: 'password',
      name: 'password',
      errorMessageId: 'passwordError',
      required: true,
      autocomplete: 'off',
      displayName: 'Password'
    }
  ]

  const validationSchema = object().shape({
    email: string()
      .email('Invalid email!')
      .required('Please enter your email!'),
    password: string()
      .min(10, 'Too short!')
      .required('Please enter your password!')
  })

  const onSubmit = async (
    values: OnSubmitObject,
    { resetForm, setStatus, setSubmitting }: FormikActions<OnSubmitObject>
  ) => {
    try {
      localStorage.setItem('signed_in', 'true')
      await signIn(SignInTypes.auth0, values.email, values.password)
      resetForm()
      setStatus({ openModal: true, success: true })
    } catch (error) {
      setStatus({ openModal: true, success: false })
      setSubmitting(false)
      resetForm()
    }
  }

  const submitType = 'Sign In!'
  const failMessage = 'Failed to Sign In. Please try again!'
  const successMessage = 'You signed in onward to awesomeness! Yay!'

  const formInitialValues = [
    { name: 'email', value: '' },
    { name: 'password', value: '' }
  ]

  return (
    <div>
      <p>Please sign in</p>
      <Link href="/">
        <a>Index</a>
      </Link>
      <DynamicForm
        failMessage={failMessage}
        formInput={formInput}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        submitType={submitType}
        successMessage={successMessage}
        formInitialValues={formInitialValues}
      />
    </div>
  )
}

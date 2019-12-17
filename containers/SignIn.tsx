import React, { useState } from 'react'
import { object, string } from 'yup'
import { FormikActions } from 'formik'
import Modal from 'react-modal'
import Link from 'next/link'

import { signIn } from '../utils/auth'
import DynamicForm from '../components/DynamicForm'

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
      await signIn(SignInTypes.auth0, values.email, values.password)
    } catch (err) {
      resetForm()
      setStatus({ openModal: true, success: false })
      setSubmitting(false)
    }
  }

  // TODO - fix styles
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }
  const [modalState, setModalState] = useState(false)
  function closeModal() {
    setModalState(false)
  }
  const facebookSignIn = () => {
    try {
      signIn(SignInTypes.social)
    } catch (error) {
      localStorage.setItem('signed_in', 'false')
      setModalState(true)
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
        onSubmit={onSubmit}
        submitType={submitType}
        successMessage={successMessage}
        validationSchema={validationSchema}
        formInitialValues={formInitialValues}
      />
      <button onClick={facebookSignIn}>Facebook Sign In</button>
      <Modal
        isOpen={modalState}
        closeTimeoutMS={2}
        style={customStyles}
        contentLabel={failMessage}
        shouldCloseOnOverlayClick={true}
      >
        <button onClick={closeModal}>close</button>
        <h3>{failMessage}</h3>
      </Modal>
    </div>
  )
}

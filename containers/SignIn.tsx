import React, { useState } from 'react'
import { object, string } from 'yup'
import { FormikHelpers } from 'formik'
import { Button, Box, Image, Paragraph } from 'grommet'
import { Facebook } from 'grommet-icons'
import FacebookSignInFailModal from 'react-modal'

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
      .min(8, 'Too short!')
      .required('Please enter your password!')
  })
  const [failMessageTest, setFailMessageTest] = useState('')
  const onSubmit = async (
    values: OnSubmitObject,
    { resetForm, setStatus, setSubmitting }: FormikHelpers<OnSubmitObject>
  ) => {
    try {
      localStorage.setItem('signed_in', 'true')
      await signIn(SignInTypes.auth0, values.email, values.password)
    } catch (err) {
      setFailMessageTest(`${err.description} Maybe you haven't Signed Up?`)
      localStorage.setItem('signed_in', 'false')
      resetForm()
      setStatus({
        openModal: true,
        success: false,
        errorMessage: err.description
      })
      setSubmitting(false)
    }
  }

  const submitType = 'SIGN IN'
  const failMessage = 'Failed to Sign In. Please try again!'
  const successMessage = 'You signed in onward to awesomeness! Yay!'
  const a11yTitle = 'Button to submit sign in credentials'

  const formInitialValues = [
    { name: 'email', value: '' },
    { name: 'password', value: '' }
  ]

  // N.B. - Facebook sign-in
  // TODO - fix styles
  const facebookModalCustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }
  const [facebookSignInModalState, setFacebookSignInModalState] = useState(
    false
  )
  function closeModal() {
    setFacebookSignInModalState(false)
  }
  const facebookSignIn = () => {
    try {
      signIn(SignInTypes.social)
    } catch (error) {
      localStorage.setItem('signed_in', 'false')
      setFacebookSignInModalState(true)
    }
  }

  return (
    <Box
      a11yTitle='sign in card'
      align='center'
      background='white'
      border={true}
      elevation='small'
      flex={false}
      gridArea='middlemiddle'
      justify='center'
      margin={{
        top: '120px'
      }}
      responsive={true}
      round='xsmall'
      width='medium'
    >
      <Box height='small' width='small' round='full'>
        <Image
          aria-label='no meat may logo'
          src='/circle-NMM.png'
          fit='contain'
        />
      </Box>
      <DynamicForm
        failMessage={failMessageTest}
        formInput={formInput}
        onSubmit={onSubmit}
        submitType={submitType}
        successMessage={successMessage}
        validationSchema={validationSchema}
        formInitialValues={formInitialValues}
        a11yTitle={a11yTitle}
      />
      <Button
        a11yTitle='Submit Facebook sign in credentials'
        color='#4267B2'
        data-testid='submit'
        icon={<Facebook />}
        label='CONTINUE WITH FACEBOOK'
        margin={{
          top: '0',
          bottom: '10px'
        }}
        onClick={() => facebookSignIn()}
        primary={true}
        type='submit'
      />
      <Paragraph
        a11yTitle='facebook reassurance'
        margin={{
          top: '0',
          bottom: '20px'
        }}
        size='small'
        textAlign='center'
      >
        We won't post anything to Facebook without your permission.
      </Paragraph>
      <FacebookSignInFailModal
        isOpen={facebookSignInModalState}
        closeTimeoutMS={2}
        style={facebookModalCustomStyles}
        contentLabel={failMessage}
        shouldCloseOnOverlayClick={true}
      >
        <button onClick={closeModal}>close</button>
        <h3>{failMessage}</h3>
      </FacebookSignInFailModal>
    </Box>
  )
}

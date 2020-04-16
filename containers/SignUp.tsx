import React, { useState } from 'react'
import { object, string } from 'yup'
import { Box, Image, Paragraph, Button } from 'grommet'
import { Facebook } from 'grommet-icons'
import { signUp, signIn } from '../utils/auth'
import { SignInTypes } from '../utils/types'
import FacebookSignInFailModal from 'react-modal'
import logger from '../utils/logger'

import DynamicForm from '../components/DynamicForm'

import { FormikHelpers } from 'formik'
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
    }
  ]
  const validationSchema = object().shape({
    email: string()
      .email('Invalid email!')
      .trim()
      .required('Please enter an email!'),
    password: string()
      .min(8, 'Too short!')
      .trim()
      .required('Please enter a password!')
  })
  const [failMessage, setFailMessage] = useState('')
  const onSubmit = async (
    values: OnSubmitObject,
    { resetForm, setSubmitting, setStatus }: FormikHelpers<OnSubmitObject>
  ) => {
    try {
      const res = await signUp({
        email: values.email,
        password: values.password
      })
      logger.log({
        level: 'INFO',
        description: `Email has been successfully signed up - ${res}`
      })
      resetForm()
      setStatus({ openModal: true, success: true })
    } catch (err) {
      setFailMessage(
        `${err.description} - Email already taken or other error. Try again!`
      )
      logger.log({
        level: 'INFO',
        description: `Email has been successfully signed up`
      })
      resetForm()
      setStatus({ openModal: true, success: false })
      setSubmitting(false)
    }
  }

  const submitType = 'SIGN UP'
  const successMessage =
    'You suceeded in Signing Up! Yay! You will be redirected to the sign in page.'
  const a11yTitle = 'Sign up submission button'

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
      <Box
        height='small'
        margin={{
          top: '24px',
          bottom: '24px'
        }}
        width='small'
        round='full'
      >
        <Image
          a11yTitle='no meat may logo'
          src='/circle-NMM.png'
          fit='contain'
        />
      </Box>
      <DynamicForm
        failMessage={failMessage}
        formInput={formInput}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        submitType={submitType}
        successMessage={successMessage}
        formInitialValues={formInitialValues}
        a11yTitle={a11yTitle}
        redirect='signin'
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
        <button onClick={closeModal}>X</button>
        <h3>{failMessage}</h3>
      </FacebookSignInFailModal>
    </Box>
  )
}

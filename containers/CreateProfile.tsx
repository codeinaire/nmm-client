import React from 'react'
import { object, string, boolean } from 'yup'
import { FormikActions } from 'formik'
// import { useMutation } from '@apollo/react-hooks'
// import gql from 'graphql-tag'

import DynamicForm from '../components/DynamicForm'

import { OnSubmitObject } from '../components/types'

// export const CREATE_USER_PROFILE = gql`
//   mutation CreateUserProfile($userProfileInput: UserProfileInput) {
//     createUserProfile(userProfileInput: $userProfileInput) {
//       totalPoints
//       username
//       profilePic
//       challengeQuote
//     }
//   }
// `

export default function CreateProfile() {
  // const [createUserProfile] = useMutation(CREATE_USER_PROFILE)

  const checkboxInput = [
    {
      type: 'checkbox',
      name: 'environment',
      errorMessageId: 'environmentError',
      required: false,
      autocomplete: 'off',
      displayName: 'Environment'
    },
    {
      type: 'checkbox',
      name: 'animalWelfare',
      errorMessageId: 'animalWelfareError',
      required: false,
      autocomplete: 'off',
      displayName: 'Animal Welfare'
    },
    {
      type: 'checkbox',
      name: 'personalHealth',
      errorMessageId: 'personalHealthError',
      required: false,
      autocomplete: 'off',
      displayName: 'Personal Health'
    },
    {
      type: 'checkbox',
      name: 'foodSecurity',
      errorMessageId: 'foodSecurityError',
      required: false,
      autocomplete: 'off',
      displayName: 'Food Security'
    }
  ]

  const formInput = [
    {
      type: 'text',
      name: 'username',
      errorMessageId: 'usernameError',
      required: false,
      autocomplete: 'on',
      displayName: 'Username',
      disabled: true
    },
    {
      type: 'text',
      name: 'challengeQuote',
      errorMessageId: 'challengeQuoteError',
      required: false,
      autocomplete: 'off',
      displayName: 'Challenge Quote',
      hintText: 'What is a quote you want to use to keep you inspired?'
    },
    {
      type: 'text',
      name: 'bio',
      errorMessageId: 'bioError',
      required: false,
      autocomplete: 'off',
      textArea: true,
      displayName: 'Bio',
      hintText: 'Tell us something about yourself.'
    },
    {
      checkbox: true,
      legend: 'Motivations',
      name: 'motivations',
      checkboxInput,
      hintText: 'Choose at least 1!'
    },
    {
      type: 'file',
      name: 'profilePic',
      errorMessageId: 'profilePicError',
      required: true,
      autocomplete: 'off',
      displayName: 'Profile Photo',
      hintText: 'Upload a photo for your profile for more points!'
    }
  ]

  const formSelect = [
    {
      name: 'challengeGoals',
      errorMessageId: 'challengeGoalsError',
      title: 'How much do you want to challenge yourself?',
      options: [
        {
          value: '',
          displayName: 'How many meals per week to make?'
        },
        {
          value: 5,
          displayName: 'Five(5) meals per week'
        },
        {
          value: 10,
          displayName: 'Ten(10) meals per week'
        },
        {
          value: 15,
          displayName: 'Fifteen(15) meals per week'
        },
        {
          value: 20,
          displayName: 'Twenty(20) meals per week'
        }
      ]
    }
  ]

  const validationSchema = object().shape({
    bio: string(),
    environment: boolean().oneOf([true], 'Please choose one motivation!'),
    animalWelfare: boolean().oneOf([true], 'Please choose one motivation!'),
    personalHealth: boolean().oneOf([true], 'Please choose one motivation!'),
    foodSecurity: boolean().oneOf([true], 'Please choose one motivation!')
  })

  const onSubmit = async (
    values: OnSubmitObject,
    { resetForm, setSubmitting, setStatus }: FormikActions<OnSubmitObject>
  ) => {
    try {
      let motivations: string = ''
      for (const valuesProperty in values) {
        if (
          valuesProperty == 'environment' ||
          valuesProperty == 'personalHealth' ||
          valuesProperty == 'foodSecurity' ||
          valuesProperty == 'animalWelfare'
        ) {
          motivations = motivations.concat(',', valuesProperty)
          delete values[valuesProperty]
        }
        values.motivations = motivations
      }

      resetForm()
      setStatus({ openModal: true, success: true })
    } catch (error) {
      resetForm()
      setStatus({ openModal: true, success: false })
      setSubmitting(false)
    }
  }

  const submitType = 'Create your profile!'
  const failMessage = 'Profile creation failed! Please try again.'
  const successMessage = 'You suceeded in creating your NMM profile. Yay!'

  return (
    <div>
      <h1>Fill it out please!</h1>
      <DynamicForm
        failMessage={failMessage}
        formInput={formInput}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        submitType={submitType}
        successMessage={successMessage}
        formSelect={formSelect}
      />
    </div>
  )
}

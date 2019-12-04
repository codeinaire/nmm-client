import React from 'react'
import { object, number, boolean, ValidationError } from 'yup'
import { FormikActions } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import logger from '../utils/logger'
import DynamicForm from '../components/DynamicForm'

import { OnSubmitObject, CheckboxSchemaObj } from '../components/types'

export const CREATE_USER_PROFILE = gql`
  mutation CreateUserProfile($userProfileInput: UserProfileInput) {
    createUserProfile(userProfileInput: $userProfileInput) {
      totalPoints
      username
      profilePic
      challengeQuote
    }
  }
`

export default function CreateProfile() {
  const [createUserProfile] = useMutation(CREATE_USER_PROFILE)

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
      errorMessageId: 'motivationsError',
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

  let validationSchema = object().shape({
    challengeGoals: number().required(
      'Please select challenges goals to work towards!'
    ),
    environment: boolean(),
    animalWelfare: boolean(),
    personalHealth: boolean(),
    foodSecurity: boolean()
  })

  const validationSchemaExtended = validationSchema.test({
    name: 'motivationsCheckboxTest',
    test: (checkboxObj: CheckboxSchemaObj) => {
      if (
        checkboxObj.environment ||
        checkboxObj.animalWelfare ||
        checkboxObj.personalHealth ||
        checkboxObj.foodSecurity
      ) {
        return true
      }
      return new ValidationError(
        'Check at least one motivation please!',
        null,
        'environment'
      )
    }
  })

  const onSubmit = async (
    values: OnSubmitObject,
    { resetForm, setSubmitting, setStatus }: FormikActions<OnSubmitObject>
  ) => {
    try {
      // N.B. convert checkbox values to string for DB
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
      (values.challengeGoals as unknown as number) = parseInt(values.challengeGoals, 10)

      const createdProfile = await createUserProfile({
        variables: {
          userProfileInputs: values
        }
      })
      resetForm()
      setStatus({ openModal: true, success: true })
      logger.log({
        level: 'INFO',
        description: `Profile ${createdProfile.data.createUserProfile.id} with username ${createdProfile.data.createUserProfile.username} succeeded in being created!`
      })
    } catch (err) {
      logger.log({
        level: 'ERROR',
        description: err
      })
      resetForm()
      setStatus({ openModal: true, success: false })
      setSubmitting(false)
    }
  }

  const submitType = 'Create your profile!'
  const failMessage = 'Profile creation failed! Please try again.'
  const successMessage = 'You suceeded in creating your NMM profile. Yay!'

  const formInitialValues = [
    { name: 'environment', value: false },
    { name: 'challengeGoals', value: '' },
    { name: 'bio', value: '' },
    { name: 'challengeQuote', value: '' },
    { name: 'motivations', value: '' },
    { name: 'profilePic', value: '' }
  ]

  return (
    <div>
      <h1>Fill it out please!</h1>
      <DynamicForm
        failMessage={failMessage}
        formInput={formInput}
        validationSchema={validationSchemaExtended}
        onSubmit={onSubmit}
        submitType={submitType}
        successMessage={successMessage}
        formSelect={formSelect}
        formInitialValues={formInitialValues}
      />
    </div>
  )
}

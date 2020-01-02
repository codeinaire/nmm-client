import React from 'react'
import { useRouter } from 'next/router'
import { string, object, boolean, ValidationError } from 'yup'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import logger from '../utils/logger'

import DynamicForm from '../components/DynamicForm'

import { OnSubmitObject, CheckboxSchemaObj } from '../components/types'
import { FormikHelpers } from 'formik'

export const CREATE_USER_PROFILE = gql`
  mutation CreateUserProfile($userProfileInput: UserProfileInput) {
    createUserProfile(userProfileInput: $userProfileInput) {
      id
      totalPoints
      username
      profilePic
      challengeQuote
    }
  }
`

export default function CreateProfile() {
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
      displayName: 'Username'
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
      name: 'lowResProfile',
      errorMessageId: 'lowResProfileError',
      required: true,
      autocomplete: 'off',
      displayName: 'Profile Photo',
      hintText: 'Upload a photo for your profile for more points!'
    },
    {
      type: 'hidden',
      name: 'id'
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
          value: '5',
          displayName: 'Five(5) meals per week'
        },
        {
          value: '10',
          displayName: 'Ten(10) meals per week'
        },
        {
          value: '15',
          displayName: 'Fifteen(15) meals per week'
        },
        {
          value: '20',
          displayName: 'Twenty(20) meals per week'
        }
      ]
    }
  ]

  const router = useRouter()
  const formInitialValues = [
    { name: 'environment', value: false },
    { name: 'foodSecurity', value: false },
    { name: 'animalWelfare', value: false },
    { name: 'personalHealth', value: false },
    { name: 'challengeGoals', value: '' },
    { name: 'bio', value: '' },
    { name: 'challengeQuote', value: '' },
    { name: 'motivations', value: '' },
    { name: 'lowResProfile', value: '' },
    { name: 'standardResolution', value: '' },
    { name: 'username', value: '' },
    { name: 'id', value: router.query.userId }
  ]

  let validationSchema = object().shape({
    username: string().required('Please enter a display to use in the app!'),
    challengeGoals: string().required(
      'Please select challenges goals to work towards!'
    ),
    environment: boolean(),
    animalWelfare: boolean(),
    personalHealth: boolean(),
    foodSecurity: boolean(),
    lowResProfile: string()
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

  const [createUserProfile] = useMutation(CREATE_USER_PROFILE)
  const onSubmit = async (
    values: OnSubmitObject,
    {
      resetForm,
      setSubmitting,
      setStatus,
      setFieldValue
    }: FormikHelpers<OnSubmitObject>
  ) => {
    try {
      setFieldValue('id', router.query.userId)

      /**
       * @remark convert checkbox values to string for DB &
       * remove empty keys with no value for CalculatePoints class
       */
      let motivations: string = ''
      for (const valuesProperty in values) {
        if (
          valuesProperty == 'environment' ||
          valuesProperty == 'personalHealth' ||
          valuesProperty == 'foodSecurity' ||
          valuesProperty == 'animalWelfare'
        ) {
          if (values[valuesProperty]) {
            motivations = motivations.concat(',', valuesProperty)
          }
          delete values[valuesProperty]
        }
        if (!values[valuesProperty]) delete values[valuesProperty]

        values.motivations = motivations
      }

      /**
       * @remark convert form string to int for db
       */
      ((values.challengeGoals as unknown) as number) = parseInt(
        values.challengeGoals,
        10
      )

      const createdProfile = await createUserProfile({
        variables: {
          userProfileInput: values
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

import React from 'react';
import { object, string } from 'yup';
// import { useMutation } from '@apollo/react-hooks';
// import gql from 'graphql-tag';

import DynamicForm from '../components/DynamicForm';
// TYPES
import { OnSubmitObject } from '../components/types';


// const CREATE_RECIPE = gql`
//   mutation createRecipe($recipe: RecipeInput!) {
//     createRecipe(recipe: $recipe) {
//       id
//       title
//       method
//     }
//   }
// `

export default function SignIn() {
  const formInput = [
    {
      type: 'text',
      name: 'title',
      errorMessageId: 'titleError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'Title'
    },
    {
      type: 'text',
      name: 'ingredients',
      errorMessageId: 'ingredientsError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'Ingredients',
      textArea: true
    },
    {
      type: 'text',
      name: 'method',
      errorMessageId: 'methodError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'Method',
      textArea: true
    },
    {
      type: 'text',
      name: 'hashtags',
      errorMessageId: 'hashtagsError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'Hashtags'
    },
    {
      type: 'text',
      name: 'name',
      errorMessageId: 'nameError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'Chef\'s Name'
    },
    {
      type: 'text',
      name: 'website',
      errorMessageId: 'websiteError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'Website'
    },
    {
      type: 'email',
      name: 'email',
      errorMessageId: 'emailError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'Email'
    },
    {
      type: 'text',
      name: 'facebook',
      errorMessageId: 'facebookError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'Facebook page or profile'
    },
    {
      type: 'text',
      name: 'instagram',
      errorMessageId: 'instagramError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'Instagram profile'
    },
    {
      type: 'text',
      name: 'twitter',
      errorMessageId: 'twitterError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'Twitter profile'
    },
    {
      type: 'file',
      name: 'photo',
      errorMessageId: 'photoError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'Recipe Photo',
    }
  ]

  const formSelect = [
    {
      name: 'difficulty',
      options: [
        {
          value: '',
          displayName: 'Please choose an DIFFICULTY LEVEL from the menu'
        },
        {
          value: 'Easy',
          displayName: 'Easy'
        },
        {
          value: 'Medium',
          displayName: 'Medium'
        },
        {
          value: 'Hard',
          displayName: 'Hard'
        }
      ]
    },
    {
      name: 'cost',
      options: [
        {
          value: '',
          displayName: 'Please choose an COST from the menu'
        },
        {
          value: 'Budget',
          displayName: 'Budget'
        },
        {
          value: 'Moderate',
          displayName: 'Moderate'
        },
        {
          value: 'Expensive',
          displayName: 'Expensive'
        }
      ]
    },
    {
      name: 'mealType',
      options: [
        {
          value: '',
          displayName: 'Please choose a MEAL TYPE level from the menu'
        },
        {
          value: 'Breakfast',
          displayName: 'Breakfast'
        },
        {
          value: 'Lunch',
          displayName: 'Lunch'
        },
        {
          value: 'Dinner',
          displayName: 'Dinner'
        },
        {
          value: 'Snack',
          displayName: 'Snack'
        }
      ]
    }
  ]

  const formInitialValues = [
    'mealType',
    'lowResolution',
    'highResolution',
    'name',
    'title',
    'ingredients',
    'method',
    'difficulty',
    'cost',
    'hashtags',
    'website',
    'email',
    'facebook',
    'instagram',
    'twitter'
  ]

  const validationSchema = object().shape({
    email: string()
      .email('Invalid email!')
      .required('Please enter the chef\'s email!'),
    title: string()
      .required('Please enter the title!'),
    ingredients: string()
      .required('Please enter the ingredients!'),
    method: string()
      .required('Please enter the method!'),
    hashtags: string()
      .required('Please enter the hashtags!'),
    name: string()
      .required('Please enter the chef\'s name!'),
    website: string()
      .required('Please enter the chef\'s website!'),
    photo: string()
      .required('Please upload a photo!')
  })

  // const [createRecipe] = useMutation(CREATE_RECIPE)
  const onSubmit = async (values: OnSubmitObject) => {
    console.log('testing',values);

    // createRecipe({
    //   variables: {
    //     recipe: values
    //   }
    // })
  }

  const submitType = 'Create Recipe!';

  return (
    <div>
      <p>Create your recipe!</p>
      <DynamicForm
        formInput={formInput}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        submitType={submitType}
        formSelect={formSelect}
        formInitialValues={formInitialValues}
      />
    </div>
  )
}
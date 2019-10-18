import React from 'react';
import AuthTest from '../components/AuthTest';
import DynamicForm from '../components/DynamicForm';
import { object, string } from 'yup';

const Home = () => {

  const formTest = [
    {
      type: 'email',
      name: 'email',
      errorMessageId: 'emailError',
      required: 'true',
      autocomplete: 'on',
      displayName: 'Email'
    },
    {
      type: 'password',
      name: 'password',
      errorMessageId: 'passwordError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'Password'
    },
    {
      type: 'motivation',
      name: 'motivation',
      errorMessageId: 'motivationError',
      required: 'true',
      autocomplete: 'off',
      displayName: 'motivation'
    }
  ]

  const validationSchema = object().shape({
    email: string()
      .email('Invalid email')
      .required('Required'),
    password: string()
      .min(8, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
    motivation: string()
      .min(10, 'More!')
      .required('Required')
  })

  return(
    <div>
      <h1>Welcome Home!</h1>
      <AuthTest />
      <DynamicForm formTest={formTest} validationSchema={validationSchema} />
    </div>
  )
}

export default Home;

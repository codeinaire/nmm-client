import * as React from 'react'
import {
  fireEvent,
  render,
  waitFor,
  getNodeText,
  RenderResult
} from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import SignUp from '../../containers/SignUp'
import SignIn from '../../containers/SignIn'

// Mocks
// import auth0 from 'auth0-js'
import { signUp } from '../../utils/auth'
// jest.mock('../../utils/auth')
// jest.mock('../../utils/auth', () => {
//   return jest.fn().mockResolvedValueOnce(() => {
//     return {
//       email: 'test@user.com',
//       email_verified: false,
//       _id: 'testId'
//     }
//   })
// })
// const mockFn = jest.fn().mockImplementation(signUp)

// const webAuth = new auth0.WebAuth({
//   domain: 'testdomain.com' || '',
//   clientID: 'testappclientid' || '',
//   redirectUri: 'http://testdomain.com/redirect',
//   responseType: 'token id_token',
//   scope: 'openid profile email',
//   audience: 'http://testdomain.com/api/v2/'
// })

const mockedWebAuth = mocked(signUp, true)
mockedWebAuth.mockResolvedValueOnce(() =>
  Promise.resolve({
    email: 'test@user.com',
    email_verified: false,
    _id: 'testId'
  })
)

describe('Auth0 component & functions', () => {
  describe('[SIGN UP] process', () => {
    describe('is given [VALID] signup details', () => {
      it('[RETURNED] - user details', async () => {
        // auth0.signup = jest.fn(() =>
        //   Promise.resolve({
        //     email: 'test@user.com',
        //     email_verified: false,
        //     _id: 'testId'
        //   })
        // )
        const renderedComponent = render(<SignUp />)

        const { input: emailInput } = await fillInputField(
          renderedComponent,
          'Email',
          'test@user.com'
        )
        expect(emailInput.value).toBe('test@user.com')
        const { input: passwordInput } = await fillInputField(
          renderedComponent,
          'Password',
          'aoeui123'
        )
        expect(passwordInput.value).toBe('aoeui123')

        waitFor(() => {
          fireEvent.click(renderedComponent.getByTestId('submit'))
        })

        expect(signUp).toHaveBeenCalledTimes(1)
        // const returnedSignUp = mockedWebAuth.signup.mockResolvedValueOnce({
        //   email: 'test@user.com',
        //   email_verified: false,
        //   _id: 'testId'
        // })

        // console.log('returnedSignUp', returnedSignUp)

        // TODO - implement redirect to signin page or maybe
        // sign them in automatically??
      })
    })

    // describe('[ERRORS] from incorrect input', () => {
    //   describe('is given [EMPTY] signup details', () => {
    //     it('[RETURNED] - "Please enter..." error messages', async () => {
    //       const component = render(<SignUp />)

    //       fillInputField(component.getByTestId('email'), '')
    //       fillInputField(component.getByTestId('password'), '')

    //       fireEvent.click(component.getByTestId('submit'))

    //       await wait(() => {
    //         testFormValidation(
    //           component,
    //           'emailError',
    //           'Please enter an email!'
    //         )
    //         testFormValidation(
    //           component,
    //           'passwordError',
    //           'Please enter a password!'
    //         )
    //         testFormValidation(
    //           component,
    //           'usernameError',
    //           'Please enter a username!'
    //         )
    //       })
    //     })
    //   })

    //   describe('is given [INVALID] signup details', () => {
    //     it('[RETURNED] - Invalid details error messages', async () => {
    //       const component = await render(<SignUp />)

    //       fillInputField(component.getByTestId('email'), 'test')
    //       fillInputField(component.getByTestId('password'), 'Aoeui')

    //       fireEvent.click(component.getByTestId('submit'))

    //       await wait(() => {
    //         testFormValidation(component, 'emailError', 'Invalid email!')
    //         testFormValidation(component, 'passwordError', 'Too short!')
    //       })
    //     })
    //   })
    // })
  })

  // describe('[SIGN IN] process', () => {
  //   describe('[ERRORS] from incorrect input', () => {
  //     describe('is given [EMPTY] details', () => {
  //       it('[RETURNED] - "Please enter..." error messages', async () => {
  //         const component = render(<SignIn />)

  //         fillInputField(component.getByTestId('email'), '')
  //         fillInputField(component.getByTestId('password'), '')

  //         fireEvent.click(component.getByTestId('submit'))

  //         await wait(() => {
  //           testFormValidation(
  //             component,
  //             'emailError',
  //             'Please enter your email!'
  //           )
  //           testFormValidation(
  //             component,
  //             'passwordError',
  //             'Please enter your password!'
  //           )
  //         })
  //       })
  //     })

  //     describe('is given [INVALID] details', () => {
  //       it('[RETURNED] - Invalid details error messages', async () => {
  //         const component = await render(<SignIn />)

  //         fillInputField(component.getByTestId('email'), 'test')
  //         fillInputField(component.getByTestId('password'), 'Aoeui')

  //         fireEvent.click(component.getByTestId('submit'))

  //         await wait(() => {
  //           testFormValidation(component, 'emailError', 'Invalid email!')
  //           testFormValidation(component, 'passwordError', 'Too short!')
  //         })
  //       })
  //     })
  //   })
  // })
})

// Helper Functions
const fillInputField = async (
  renderedComponent: RenderResult,
  field: string,
  value: string
) => {
  const input = renderedComponent.getByLabelText(field) as HTMLInputElement
  await waitFor(() => {
    fireEvent.change(input, {
      target: { value }
    })
  })
  return { input }
}

const testFormValidation = async (
  component: any,
  elementDataId: string,
  errorMessage: string
) => {
  const textOfNode = getNodeText(component.getByTestId(elementDataId))
  expect(textOfNode).toBe(errorMessage)
}

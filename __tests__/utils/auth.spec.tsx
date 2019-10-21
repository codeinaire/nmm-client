import * as React from 'react';
import { fireEvent, render, wait, queryByTestId } from '@testing-library/react';
import { mocked } from 'ts-jest/utils'

import SignUp from '../../containers/SignUp';

// Mocks
import auth0 from 'auth0-js';
jest.mock('auth0-js');
const webAuth = new auth0.WebAuth({
  domain: 'testdomain.com'|| '',
  clientID: 'testappclientid' || '',
  redirectUri: 'http://testdomain.com/redirect',
  responseType: 'token id_token',
  scope: 'openid profile email',
  audience: 'http://testdomain.com/api/v2/'
})

const mockedWebAuth: any = mocked(webAuth, true);

const fillField = (field: HTMLElement, value: any) => {
  fireEvent.change(field, {
      persist: () => {},
      target: { value },
  });
};

const waitForSubmission = (
  submitButton: HTMLElement,
) => {
  fireEvent.click(submitButton);
};


describe('Auth0 component & functions', () => {
  describe('[SignUp] process', () => {
    describe('is given [VALID] signup details', () => {
      it('Returned - user details', async done => {
        const component = await render(<SignUp />);

        fillField(component.getByLabelText('Email', {
          selector: 'input'
        }), 'test@email.com');
        fillField(component.getByLabelText('Password', {
          selector: 'input'
        }), 'Aoeui1@345');
        fillField(component.getByLabelText('Username', {
          selector: 'input'
        }), 'TestUser');

        await waitForSubmission(
          component.getByText('Sign Up!')
        )

        // TODO - not exactly sure if this is really necessary??
        mockedWebAuth.signup.mockReturnValueOnce({
          email: 'test@email.com',
          username: 'TestUser',
          email_verified: false,
          _id: 'testId'
        });
        done();

        // TODO - implement redirect to signin page or maybe
        // sign them in automatically??


      })
    })

    describe('[ERRORS] from incorrect signup', () => {
      describe('is given [EMPTY] signup details', () => {
        it('Returned - "Please enter..." error messages', async done => {
          const component = await render(<SignUp />);

          fillField(component.getByLabelText('Email', {
            selector: 'input'
          }), '');
          fillField(component.getByLabelText('Password', {
            selector: 'input'
          }), '');
          fillField(component.getByLabelText('Username', {
            selector: 'input'
          }), '');

          await waitForSubmission(component.getByText('Sign Up!'));

          await wait(() => {
              expect(component.queryByText('Please enter an email!')).toBeTruthy()
              done();
            }
          );
          await wait(() => {
              expect(component.queryByText('Please enter a password!')).toBeTruthy()
              done();
            }
          );
          await wait(() => {
              expect(component.queryByText('Please enter a username!')).toBeTruthy()
              done();
            }
          )
          done();
        })
      })

      describe('is given [INVALID] signup details', () => {
        it('Returned - Invalid details error messages', async done => {
          const component = await render(<SignUp />);

          fillField(component.getByLabelText('Email', {
            selector: 'input'
          }), 'test');
          fillField(component.getByLabelText('Password', {
            selector: 'input'
          }), 'Aoeui');
          fillField(component.getByLabelText('Username', {
            selector: 'input'
          }), 'toooooooolongusername');

          await waitForSubmission(component.getByText('Sign Up!'));

          await wait(() => {
              expect(component.queryByText('Invalid email!')).toBeTruthy()
              done();
            }
          );
          await wait(() => {
              expect(component.queryByText('Too short!')).toBeTruthy()
              done();
            }
          );
          await wait(() => {
              expect(component.queryByText('Too long!')).toBeTruthy()
              done();
            }
          )
          done();
        })
      })
    })
  })
})
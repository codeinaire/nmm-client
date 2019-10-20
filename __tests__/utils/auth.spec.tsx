import * as React from 'react';
import { mount } from 'enzyme';

import SignUp from '../../containers/SignUp';

describe('Auth0 component & functions', () => {
  describe('[SignUp] process', () => {
    describe('is given [VALID] signup details', () => {
      it('Returned - user details', async () => {
      const wrap: any = mount(<SignUp />);

      expect(wrap.find('button').text()).toBe('Sign Up!');

      wrap.find('input#email').simulate('change', {
        target:  {
          value: 'test@user.com'
        }
      });
      wrap.find('input#password').simulate('change', {
        target:  {
          value: 'Aoeui1@3ao'
        }
      });
      wrap.find('input#username').simulate('change', {
        target:  {
          value: 'testUser'
        }
      });
      console.log(wrap.debug());

      wrap.find('button').simulate('click')


      })
    })
  })
})
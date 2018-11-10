import React from 'react';
import { shallow } from 'enzyme';

import { Login } from '../../components/Login/Login';

const styles = {
  root: {
    width: 400
  },
  selected: {
    color: '#999'
  },
  input: {
    width: '100%'
  },
  button: {
    textTransform: 'uppercase'
  }
};

describe('Login component ->', () => {
  const wrapper = shallow(<Login classes={styles} />);
  it('has TextField with name "email" and "password', () => {
    expect(wrapper.find('TextField[name="email"]')).toBeTruthy();
    expect(wrapper.find('TextField[name="password"]')).toBeTruthy();
  });

  it('handleEmailChange valid work', () => {
    const testValue = 'test@test.io';
    wrapper.instance().handleEmailChange({ target: { value: testValue } });
    expect(wrapper.state().inputEmail).toBe(testValue);
  });

  it('handlePasswordChange valid work', () => {
    const testValue = 'welcome';
    wrapper.instance().handlePasswordChange({ target: { value: testValue } });
    expect(wrapper.state().inputPassword).toBe(testValue);
  });

  it("Event 'onChange' for texfields Email and Password change state", () => {
    const testValue = 'test@test.io';
    wrapper
      .find('TextField[name="email"]')
      .simulate('change', { target: { name: 'email', value: testValue } });
    expect(wrapper.state().inputEmail).toBe(testValue);
  });
});

import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import { PrivateRoute } from '../../components/PrivateRoute/PrivateRoute';
import { Profile } from '../../components/Profile/Profile';

describe('PrivateRoute component ->', () => {
  it('check redirect to Login if isAuthorized=false', () => {
    const testProps = { isAuthorized: false, component: Profile };
    const wrapper = shallow(<PrivateRoute {...testProps} />);
    expect(wrapper.find('Redirect')).not.toHaveLength(0);
  });
  it('check redirect to Profile if isAuthorized=true', () => {
    const testProps = { isAuthorized: true, component: Profile };
    const wrapper = shallow(<PrivateRoute {...testProps} />);
    expect(wrapper.find('Route')).not.toHaveLength(0);
  });
});

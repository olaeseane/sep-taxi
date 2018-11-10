import React from 'react';
import { shallow, render } from 'enzyme';
import { Profile } from '../../components/Profile/Profile';

describe('Profile component ->', () => {
  const mockFn = jest.fn();
  const props = {
    profileRequest: mockFn,
    profile: { data: { id: 'PFr1fb~1Mz6OIGk8TDM_J', email: 'test1111@test.io' } }
  };

  it('must render html with props data.id & data.email', () => {
    const wrapper = render(<Profile {...props} />);
    expect(wrapper.text()).toMatch(new RegExp(props.profile.data.id));
    expect(wrapper.text()).toMatch(new RegExp(props.profile.data.email));
  });

  it('must dispatch PROFILE/REQUEST action', () => {
    const wrapper = shallow(<Profile {...props} />);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import NavBar from './NavBar';

describe('NavBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavBar />);
  });

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render div', () => {
    expect(wrapper.is('div')).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should toggle navbar', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});

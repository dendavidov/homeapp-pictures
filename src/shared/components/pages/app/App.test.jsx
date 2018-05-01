import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
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
});

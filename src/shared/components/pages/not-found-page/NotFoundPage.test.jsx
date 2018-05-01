import React from 'react';
import { shallow } from 'enzyme';

import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NotFoundPage />);
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

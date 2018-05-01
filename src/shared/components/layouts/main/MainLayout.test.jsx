import React from 'react';
import { shallow } from 'enzyme';

import { MainLayoutRaw as MainLayout } from './MainLayout';

jest.mock('../../../routes', () => ({
  renderRoutes: routes => routes.map(route => route.name),
}));

describe('MainLayout', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MainLayout routes={[{ name: 'test' }]} />);
  });

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render div', () => {
    expect(wrapper.is('div')).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

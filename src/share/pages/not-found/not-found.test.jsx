import React from 'react';
import renderer from 'react-test-renderer';
import NotFoundPage from './not-found';

describe('NotFound', () => {
  it('should render correctly', () => {
    const notFound = renderer.create(<NotFoundPage />).toJSON();
    expect(notFound).toMatchSnapshot();
  });
});

import React from 'react';
import renderer from 'react-test-renderer';

import SignIn from '../../../src/client/pages/sign-in';

describe('SignIn component is rendered correctly', () => {
  it('OK', () => {
    const rendered = renderer.create(
      <SignIn />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});

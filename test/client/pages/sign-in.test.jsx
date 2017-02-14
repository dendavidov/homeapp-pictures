import React from 'react';
import renderer from 'react-test-renderer';

import SignIn from '../../../src/client/pages/sign-in';

describe('SignIn component is rendered correctly', () => {
  beforeEach(() => {
    SignIn.contextTypes = {
      router: () => {},
    };
  });

  it('OK', () => {
    const rendered = renderer.create(
      <SignIn />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});

import React from 'react';
import {render, screen} from '@testing-library/react';

import Svg from './svg';

it(`Svg should render correctly`, () => {

  render(
      <Svg />
  );

  expect(screen.getByTestId(`add`)).toBeInTheDocument();
  expect(screen.getByTestId(`full-screen`)).toBeInTheDocument();
  expect(screen.getByTestId(`in-list`)).toBeInTheDocument();
  expect(screen.getByTestId(`pause`)).toBeInTheDocument();

});

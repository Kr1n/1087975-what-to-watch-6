import React from 'react';
import {render} from '@testing-library/react';

import Loading from './loading';

it(`Loading should render correctly`, () => {

  const {getByText} = render(
      <Loading />
  );
  const headerElement = getByText(/Loading/);
  expect(headerElement).toBeInTheDocument();

});

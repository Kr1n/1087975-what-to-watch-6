import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Error from './error';

it(`Error page should render correctly`, () => {
  const history = createMemoryHistory();
  const {getByText} = render(
      <Router history={history}>
        <Error />
      </Router>
  );
  const headerElement = getByText(`Server error`);
  const linkElement = getByText(`Back to main page`);

  expect(headerElement).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
});

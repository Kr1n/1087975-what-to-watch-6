import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Footer from './Footer';

it(`Footer page should render correctly`, () => {
  const history = createMemoryHistory();
  const {getByText} = render(
      <Router history={history}>
        <Footer />
      </Router>
  );
  const copyrightElement = getByText(`© 2019 What to watch Ltd.`);

  expect(copyrightElement).toBeInTheDocument();
});

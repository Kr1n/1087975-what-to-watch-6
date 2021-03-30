import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus} from "../../consts/common";
import * as redux from "react-redux";
import configureStore from "redux-mock-store";
import {Header} from "./header";

const mockStore = configureStore({});

it(`Header page should render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    USER: {authorizationStatus: AuthorizationStatus.NO_AUTH}
  });

  const title = `Header title`;
  const link = {
    href: `/`,
    name: `main`
  };


  const {getByText} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <Header
            title={title}
            link={link}
            authorizationStatus={AuthorizationStatus.AUTH}
          />
        </Router>
      </redux.Provider>
  );

  const titleElement = getByText(title);
  const linkElement = getByText(link.name);

  expect(titleElement).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
});

import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus} from "../../consts/common";
import * as redux from "react-redux";
import configureStore from "redux-mock-store";
import Header from "./header";

const mockStore = configureStore({});

describe(`GenreList should render correctly`, () => {

  it(`Header page should render correctly with AUTH`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });

    const title = `Header title`;
    const link = {
      href: `/`,
      name: `main`
    };

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Header
              title={title}
              link={link}
            />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(link.name)).toBeInTheDocument();
  });

  it(`Header page should render correctly with NO_AUTH`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH}
    });

    const title = `Header title`;
    const link = {
      href: `/`,
      name: `main`
    };

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Header
              title={title}
              link={link}
            />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(link.name)).toBeInTheDocument();
    expect(screen.getByText(`Sign in`)).toBeInTheDocument();
  });
});

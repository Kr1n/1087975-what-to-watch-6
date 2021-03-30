import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import FilmCard from './film-card';
import {AuthorizationStatus} from "../../consts/common";
import {adaptMoviesToClient} from "../../utils/utils";


const mockStore = configureStore({});
const mockMovie = adaptMoviesToClient([{
  "id": 1,
  "name": `The Grand Budapest Hotel`,
  "poster_image": `img/the-grand-budapest-hotel-poster.jpg`,
  "preview_image": `img/the-grand-budapest-hotel.jpg`,
  "background_image": `img/the-grand-budapest-hotel-bg.jpg`,
  "background_color": `#ffffff`,
  "video_link": `https://some-link`,
  "preview_video_link": `https://some-link`,
  "description": `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  "rating": 8.9,
  "scores_count": 240,
  "director": `Wes Andreson`,
  "starring": [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  "run_time": 99,
  "genre": `Comedy`,
  "released": 2014,
  "is_favorite": false
}])[0];


jest.mock(`./../header/header`, () =>{
  const header = () => <>This is mock Header</>;
  header.displayName = `Header`;
  return {
    __esModule: true,
    default: () => {
      return header();
    }
  };
});

describe(`FilmCard should render correctly`, () => {

  it(`Render 'FilmCard' with NOT_AUTH`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
    });

    const onFavoriteClick = ()=>{};
    const redirectToLogin = jest.fn();

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <FilmCard
              onFavoriteClick={onFavoriteClick}
              redirectToLogin={redirectToLogin}
              movie={mockMovie}
            />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`This is mock Header`)).toBeInTheDocument();
    expect(screen.getByText(`The Grand Budapest Hotel`)).toBeInTheDocument();

    expect(screen.getByTestId(`button-in-mylist`)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(`button-in-mylist`));
    expect(redirectToLogin).toBeCalled();
  });

  it(`Render 'FilmCard' with AUTH`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });

    const onFavoriteClick = jest.fn();
    const redirectToLogin = ()=>{};

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <FilmCard
              onFavoriteClick={onFavoriteClick}
              redirectToLogin={redirectToLogin}
              movie={mockMovie}
            />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`This is mock Header`)).toBeInTheDocument();
    expect(screen.getByText(`The Grand Budapest Hotel`)).toBeInTheDocument();

    expect(screen.getByTestId(`button-in-mylist`)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(`button-in-mylist`));
    expect(redirectToLogin).toBeCalled();
  });
});

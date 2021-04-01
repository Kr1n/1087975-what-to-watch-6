import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import ShowMore from './show-more';
import {adaptMoviesToClient} from "../../utils/utils";
import {ALL_GENRES} from "../../consts/common";

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
const mockMovies = new Array(5).fill((mockMovie))
  .map((item, index) => ({...item, id: index, genre: `genre${index}`}));

describe(`ShowMore should render correctly`, () => {

  it(`Render 'ShowMore' when movies.lenght > moviesShowed`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      MAIN: {moviesShowed: 2, genre: ALL_GENRES},
      DATA: {movieList: mockMovies}
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <ShowMore/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`show-more`)).toBeInTheDocument();
  });

  it(`Render 'ShowMore' when movies.lenght <= moviesShowed`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      MAIN: {moviesShowed: 5, genre: ALL_GENRES},
      DATA: {movieList: mockMovies}
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <ShowMore/>
          </Router>
        </redux.Provider>
    );

    expect(screen.queryByTestId(`show-more`)).not.toBeInTheDocument();
  });
});

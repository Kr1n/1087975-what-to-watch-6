import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import GenreList from './genre-list';
import {ALL_GENRES} from "../../consts/common";
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
const mockMovies = new Array(5).fill((mockMovie))
  .map((item, index) => ({...item, id: index, genre: `genre${index}`}));

describe(`GenreList should render correctly`, () => {

  it(`Render 'GenreList'`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      MAIN: {genre: ALL_GENRES},
      DATA: {genres: Array.from(new Set([ALL_GENRES, ...mockMovies.map((item) => item.genre)]))}
    });

    const onTabClick = jest.fn((newGenre) => newGenre);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <GenreList
              onTabClick={onTabClick}
            />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(ALL_GENRES)).toBeInTheDocument();
    expect(screen.getByText(mockMovies[3].genre)).toBeInTheDocument();

    userEvent.click(screen.getByText(mockMovies[3].genre));
    expect(onTabClick).toBeCalled();
    // expect(onTabClick).toBe(mockMovies[3].genre);
  });

});

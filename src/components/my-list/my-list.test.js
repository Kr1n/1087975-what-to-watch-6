import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from "react-redux";
import configureStore from "redux-mock-store";
import {MyList} from "./my-list";
import {adaptMoviesToClient} from "../../utils/utils";

const mockStore = configureStore({});

jest.mock(`../header/header`, () => <>This is mock Header</>);
jest.mock(`../movie-list/movie-list`, () => <>This is mock MovieList</>);

it(`MyList page should render correctly`, () => {
  const history = createMemoryHistory();

  const movie = adaptMoviesToClient([{
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
  const mockMovies = new Array(5).fill((movie))
    .map((item, index) => ({...item, id: index, name: `Film name${index}`}));

  const store = mockStore({
    DATA: {
      favoriteList: mockMovies,
      isFavoriteLoaded: true
    }
  });

  const {getByClassName} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <MyList
            movies={mockMovies}
            isFavoriteLoaded={true}
            loadFavoriteList={jest.fn()}
          />
        </Router>
      </redux.Provider>
  );

  const myListElement = getByClassName(`catalog__movies-list`);
  expect(myListElement).toBeInTheDocument();
});

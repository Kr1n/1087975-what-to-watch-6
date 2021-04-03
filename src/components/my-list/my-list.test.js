import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from "react-redux";
import configureStore from "redux-mock-store";
import {MyList} from "./my-list";
import {adaptMoviesToClient} from "../../utils/utils";

const mockStore = configureStore({});
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

jest.mock(`./../movie-list/movie-list`, () =>{
  const movieList = () => <>This is mock MovieList</>;
  movieList.displayName = `MovieList`;
  return {
    __esModule: true,
    default: () => {
      return movieList();
    }
  };
});

jest.mock(`./../footer/footer`, () =>{
  const footer = () => <>This is mock Footer</>;
  footer.displayName = `Footer`;
  return {
    __esModule: true,
    default: () => {
      return footer();
    }
  };
});

it(`MyList page should render correctly`, () => {
  const history = createMemoryHistory();

  const store = mockStore({
    DATA: {
      favoriteList: mockMovies,
      isFavoriteLoaded: true
    }
  });

  render(
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

  expect(screen.getByText(/This is mock Header/i)).toBeInTheDocument();
  expect(screen.getByText(/This is mock MovieList/i)).toBeInTheDocument();
  expect(screen.getByText(/This is mock Footer/i)).toBeInTheDocument();
});

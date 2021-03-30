import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import AddReview from './add-review';
import {AuthorizationStatus} from "../../consts/common";
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

jest.mock(`react-router-dom`, () => ({
  ...jest.requireActual(`react-router-dom`),
  useParams: () => ({id: `1`})
}));

it(`Render 'AddReview'`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    USER: {authorizationStatus: AuthorizationStatus.AUTH},
    DATA: {movieList: mockMovies},
  });
  history.push(`/film/1`);

  render(
      <redux.Provider store={store}>
        <Router history={history}>
          <AddReview
            addReview={jest.fn()}
          />
        </Router>
      </redux.Provider>
  );

  userEvent.type(screen.getByTestId(`review-text`), `keks`);

  expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
  expect(screen.getByTestId(`button-submit`)).toBeDisabled();

  const textMore50Symbols = `sqwertytrkjgvchnsdgfkukuhfsdkjhfskdhgskfqwertytrkjgvchnsdgfkukuhfsdkjhfskdhgskf`;

  userEvent.type(screen.getByTestId(`review-text`), textMore50Symbols);

  expect(screen.getByDisplayValue(`keks${textMore50Symbols}`)).toBeInTheDocument();
  expect(screen.getByTestId(`button-submit`)).toBeDisabled();

  userEvent.click(screen.getByTestId(`star-6`));

  expect(screen.getByTestId(`button-submit`)).toBeEnabled();

});

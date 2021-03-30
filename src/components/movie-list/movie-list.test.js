import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import MovieList from './movie-list';
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

jest.mock(`./../small-movie-card/small-movie-card`, () =>{
  const smallMoviesCard = () => <div>This is mock SmallMoviesCard</div>;
  smallMoviesCard.displayName = `SmallMoviesCard`;
  return {
    __esModule: true,
    default: () => {
      return smallMoviesCard();
    }
  };
});

describe(`MovieList should render correctly`, () => {

  it(`Render empty 'MovieList'`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {isDataLoaded: true}
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <MovieList
              onHover={()=>{}}
              onCursorLeave={()=>{}}
              activeFilm={-1}
              movies={[]}
            />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/List is empty./i)).toBeInTheDocument();
  });

  it(`Render not loaded 'MovieList'`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {isDataLoaded: false}
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <MovieList
              onHover={()=>{}}
              onCursorLeave={()=>{}}
              activeFilm={-1}
              movies={mockMovies}
            />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it(`Render 'MovieList'`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {isDataLoaded: true}
    });

    const onHover = jest.fn();

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <MovieList
              onHover={onHover}
              onCursorLeave={()=>{}}
              activeFilm={-1}
              movies={mockMovies}
            />
          </Router>
        </redux.Provider>
    );

    expect(screen.getAllByText(/This is mock SmallMoviesCard/i)).toHaveLength(mockMovies.length);

    userEvent.hover(screen.getAllByText(/This is mock SmallMoviesCard/i)[0]);
    expect(onHover).toBeCalled();
    // expect(onTabClick).toBe(mockMovies[3].genre);
  });

});

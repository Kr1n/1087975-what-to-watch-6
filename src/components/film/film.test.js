import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus} from "../../consts/common";
import {Film} from "./film";
import {adaptMoviesToClient} from "../../utils/utils";
import userEvent from "@testing-library/user-event";

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

jest.mock(`./../header/header`, () =>{
  const header = () => <div>This is mock Header</div>;
  header.displayName = `Header`;
  return {
    __esModule: true,
    default: () => {
      return header();
    }
  };
});

jest.mock(`./../tabs/tabs`, () =>{
  const tabs = () => <div>This is mock Tabs</div>;
  tabs.displayName = `Tabs`;
  return {
    __esModule: true,
    default: () => {
      return tabs();
    }
  };
});

jest.mock(`./../movie-list/movie-list`, () =>{
  const movieList = () => <div>This is mock MovieList</div>;
  movieList.displayName = `MovieList`;
  return {
    __esModule: true,
    default: () => {
      return movieList();
    }
  };
});

jest.mock(`react-router-dom`, () => ({
  ...jest.requireActual(`react-router-dom`),
  useParams: () => ({id: `1`})
}));

describe(`Film should render correctly`, () => {
  it(`Film page should render correctly with AUTH`, () => {
    const history = createMemoryHistory();

    const onFavoriteClick = jest.fn();
    const redirectToLogin = jest.fn();

    render(
        <Router history={history}>
          <Film
            authorizationStatus={AuthorizationStatus.AUTH}
            movie={mockMovie}
            onFavoriteClick={onFavoriteClick}
            redirectToLogin={redirectToLogin}
            relatedMovies={mockMovies}
            isDataLoaded={true}
            loadFilm={()=>{}}
            loadFilms={()=>{}}
            loadedFilmId={mockMovie.id}
          />
        </Router>
    );

    expect(screen.getByText(/Header/)).toBeInTheDocument();
    expect(screen.getByText(/Tabs/)).toBeInTheDocument();
    expect(screen.getByText(/MovieList/)).toBeInTheDocument();
    expect(screen.getByText(/More like this/)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genre)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(`button-favorite`));
    expect(onFavoriteClick).toBeCalled();
  });

  it(`Film page should render correctly with NO_AUTH`, () => {
    const history = createMemoryHistory();

    const onFavoriteClick = jest.fn();
    const redirectToLogin = jest.fn();

    render(
        <Router history={history}>
          <Film
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            movie={mockMovie}
            onFavoriteClick={onFavoriteClick}
            redirectToLogin={redirectToLogin}
            relatedMovies={mockMovies}
            isDataLoaded={true}
            loadFilm={()=>{}}
            loadFilms={()=>{}}
            loadedFilmId={mockMovie.id}
          />
        </Router>
    );

    expect(screen.getByText(/Header/)).toBeInTheDocument();
    expect(screen.getByText(/Tabs/)).toBeInTheDocument();
    expect(screen.getByText(/MovieList/)).toBeInTheDocument();
    expect(screen.getByText(/More like this/)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genre)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(`button-favorite`));
    expect(redirectToLogin).toBeCalled();
  });
});


import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus} from "../../consts/common";
import {MainPage} from "./main-page";
import {adaptMoviesToClient} from "../../utils/utils";

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

jest.mock(`./../film-card/film-card`, () =>{
  const filmCard = () => <div>This is mock FilmCard</div>;
  filmCard.displayName = `FilmCard`;
  return {
    __esModule: true,
    default: () => {
      return filmCard();
    }
  };
});

jest.mock(`./../genre-list/genre-list`, () =>{
  const genreList = () => <div>This is mock GenreList</div>;
  genreList.displayName = `GenreList`;
  return {
    __esModule: true,
    default: () => {
      return genreList();
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

jest.mock(`./../show-more/show-more`, () =>{
  const showMore = () => <div>This is mock ShowMore</div>;
  showMore.displayName = `ShowMore`;
  return {
    __esModule: true,
    default: () => {
      return showMore();
    }
  };
});

describe(`MainPage should render correctly`, () => {
  it(`MainPage page should render correctly`, () => {
    const history = createMemoryHistory();

    render(
        <Router history={history}>
          <MainPage
            authorizationStatus={AuthorizationStatus.AUTH}
            promoMovie={mockMovie}
            movies={mockMovies}
            isDataLoaded={true}
            isPromoLoaded={true}
            loadMovies={()=>{}}
            loadPromo={()=>{}}
            onLeaveMainPage={()=>{}}
          />
        </Router>
    );

    expect(screen.getByText(/FilmCard/)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/)).toBeInTheDocument();
    expect(screen.getByText(/GenreList/)).toBeInTheDocument();
    expect(screen.getByText(/ShowMore/)).toBeInTheDocument();

  });
});


import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Player} from "./player";
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

jest.mock(`./../video-player/video-player`, () =>{
  const videoPlayer = () => <div>This is mock VideoPlayer</div>;
  videoPlayer.displayName = `VideoPlayer`;
  return {
    __esModule: true,
    default: () => {
      return videoPlayer();
    }
  };
});


jest.mock(`react-router-dom`, () => ({
  ...jest.requireActual(`react-router-dom`),
  useParams: () => ({id: `1`})
}));

describe(`VideoPlayer should render correctly`, () => {
  it(`VideoPlayer page should load film, if no film loaded`, () => {
    const history = createMemoryHistory();

    const onPlayButtonClick = jest.fn();
    const onFullScreenClick = jest.fn();
    const onVideoLoaded = jest.fn();
    const loadFilms = jest.fn();

    render(
        <Router history={history}>
          <Player
            movies={mockMovies}
            onPlayButtonClick={onPlayButtonClick}
            onFullScreenClick={onFullScreenClick}
            isPlaying={true}
            isDataLoaded={false}
            loadFilms={loadFilms}
            loadedFilmId={mockMovie.id}
            onVideoLoaded={onVideoLoaded}
            currentPlayedTime={0}
            progressBarValue={0}
          />
        </Router>
    );

    expect(loadFilms).toBeCalled();
  });

  it(`VideoPlayer page should render correctly`, () => {
    const history = createMemoryHistory();

    const onPlayButtonClick = jest.fn();
    const onFullScreenClick = jest.fn();
    const onVideoLoaded = jest.fn();
    const loadFilms = jest.fn();

    render(
        <Router history={history}>
          <Player
            movies={mockMovies}
            onPlayButtonClick={onPlayButtonClick}
            onFullScreenClick={onFullScreenClick}
            isPlaying={true}
            isDataLoaded={true}
            loadFilms={loadFilms}
            loadedFilmId={mockMovie.id}
            onVideoLoaded={onVideoLoaded}
            currentPlayedTime={0}
            progressBarValue={0}
          />
        </Router>
    );

    expect(screen.getByText(/VideoPlayer/)).toBeInTheDocument();

    expect(onVideoLoaded).toBeCalled();

    userEvent.click(screen.getByTestId(`button-play`));
    expect(onPlayButtonClick).toBeCalled();

    userEvent.click(screen.getByTestId(`button-fullscreen`));
    expect(onFullScreenClick).toBeCalled();
  });
});


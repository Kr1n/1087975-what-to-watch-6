import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import withVideoPlayer from './with-video-player';
import {Player} from "../components/player/player";
import {adaptMoviesToClient} from "../utils/utils";
import * as redux from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore({});

jest.mock(`../components/player/player`, () => {
  const mockVideoPlayer = () => <>This is mock VideoPlayer</>;
  mockVideoPlayer.displayName = `MockVideoPlayer`;
  return {
    __esModule: true,
    default: () => {
      return mockVideoPlayer();
    }
  };
});

describe(`Test HOC 'withVideoPlayer`, () => {
  it(`Base component should be correct rendering when use with HOC`, () => {
    const BaseComponent = () => <h1>withVideoPlayer</h1>;
    const BaseComponentWrapped = withVideoPlayer(BaseComponent);
    render(<BaseComponentWrapped />);
    expect(screen.getByText(/withVideoPlayer/i)).toBeInTheDocument();
  });

  it(`Base component should be correct rendering another component with render-prop when use with HOC`, () => {
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
        movies: mockMovies,
      }
    });

    const history = createMemoryHistory();
    const BaseComponentWrapped = withVideoPlayer(Player);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <BaseComponentWrapped
              movies={mockMovies}
              onPlayButtonClick={jest.fn()}
              onFullScreenClick={jest.fn()}
              isPlaying={true}
              isDataLoaded={true}
              loadFilms={jest.fn()}
              onVideoLoaded={jest.fn()}
              currentPlayedTime={0}
              progressBarValue={0}
              refVideo={jest.fn()}
            >
              <p>This is children component</p>
            </BaseComponentWrapped>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/This is children component/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock AudioPlayer/i)).toBeInTheDocument();
    expect(screen.getByText(/Кто исполняет эту песню/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Cinderella/i)).toBeInTheDocument();
  });
});

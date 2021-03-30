import React from 'react';
import {render, screen} from '@testing-library/react';
import SmallMoviesCard from './small-movie-card';
import {adaptMoviesToClient} from "../../utils/utils";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {user} from "../../store/user/user";
import userEvent from "@testing-library/user-event";

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

jest.mock(`./../video-player/video-player`, () =>{
  const videoPlayer = () => <>This is mock VideoPlayer</>;
  videoPlayer.displayName = `VideoPlayer`;
  return {
    __esModule: true,
    default: () => {
      return videoPlayer();
    }
  };
});

it(`SmallMoviesCard should render correctly`, () => {
  const history = createMemoryHistory();

  const onHover = jest.fn();

  render(
      <Router history={history}>
        <SmallMoviesCard
          movie={movie}
          onHover={onHover}
          onCursorLeave={()=>{}}
          isActive={false}
        />
      </Router>
  );

  const smallCardElement = screen.getByTestId(`smallCard`);

  expect(smallCardElement).toBeInTheDocument();
  expect(screen.getByText(movie.name)).toBeInTheDocument();
  expect(screen.getByText(/VideoPlayer/)).toBeInTheDocument();

  userEvent.hover(smallCardElement);
  expect(onHover).toBeCalled();
});



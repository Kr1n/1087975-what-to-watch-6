import React from 'react';
import {render} from '@testing-library/react';
import VideoPlayer from "./video-player";
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

describe(`Test VideoPlayer`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  it(`VideoPlayer should be render correctly`, () => {
    const mockPath = `mock-path`;
    const {container} = render(<>
      <VideoPlayer
        autoPlay={true}
        videoLink={mockPath}
        backgroundImage={mockMovie.backgroundImage}
        muted={true}
      />
    </>
    );

    expect(container.querySelector(`video`)).toBeInTheDocument();
    expect(container.querySelector(`video`)).toHaveAttribute(`muted`);
  });
});

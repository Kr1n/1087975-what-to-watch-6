import React from 'react';
import {render} from '@testing-library/react';
import SmallMoviesCard from './small-movie-card';
import {adaptMoviesToClient} from "../../utils/utils";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";

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

it(`SmallMoviesCard should render correctly`, () => {
  const history = createMemoryHistory();
  const {getByText} = render(
      <Router history={history}>
        <SmallMoviesCard
          movie={movie}
          onHover={()=>(1)}
          onCursorLeave={()=>(1)}
          isActive={false}
        />
      </Router>
  );
  const movieNameElement = getByText(movie.name);

  expect(movieNameElement).toBeInTheDocument();
});



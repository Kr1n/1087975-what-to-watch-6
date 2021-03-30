import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import Tabs from './tabs';
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

const mockReview = {
  "id": 1,
  "user": {
    "id": 4,
    "name": `Kate Muir`
  },
  "rating": 8.9,
  "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  "date": `2019-05-08T14:13:56.569Z`
};

const mockReviews = new Array(5).fill((mockReview))
  .map((item, index) => ({...item, id: index, comment: `comment${index}`}));

jest.mock(`./../review/review`, () =>{
  const review = () => <div>This is mock Review</div>;
  review.displayName = `Review`;
  return {
    __esModule: true,
    default: () => {
      return review();
    }
  };
});


describe(`Tabs should render correctly`, () => {

  it(`Render overview Tab`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        reviewList: mockReviews,
        loadedCommentsFilmId: mockMovie.id
      }
    });

    const loadReviews = jest.fn();

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Tabs
              movie={mockMovie}
              loadReviews={loadReviews}
            />
          </Router>
        </redux.Provider>
    );

    expect(loadReviews).toBeCalled();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
    expect(screen.getByTestId(`overview-rating`)).toBeInTheDocument();
    expect(screen.getAllByText(/This is mock Review/i)).toHaveLength(mockReviews.length);
  });

});

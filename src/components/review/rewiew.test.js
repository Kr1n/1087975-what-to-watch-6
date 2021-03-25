import React from 'react';
import {render} from '@testing-library/react';

import Review from './review';

const review = {
  "id": 1,
  "user": {
    "id": 4,
    "name": `Kate Muir`
  },
  "rating": 8.9,
  "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  "date": `2019-05-08T14:13:56.569Z`
};

it(`Review should render correctly`, () => {

  const {getByText} = render(
      <Review review={review}/>
  );
  const commentElement = getByText(review.comment);
  const usernameElement = getByText(review.user.name);

  expect(commentElement).toBeInTheDocument();
  expect(usernameElement).toBeInTheDocument();
});



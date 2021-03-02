import React from "react";
import {reviewType} from "../../utils/prop-types";
import dayjs from "dayjs";

const Review = (props) => {
  const {review} = props;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={dayjs(review.date).format(`DD-MM-YYYY`)}>{dayjs(review.date).format(`MMMM D, YYYY`)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
};


export default Review;

Review.propTypes = {
  review: reviewType
};

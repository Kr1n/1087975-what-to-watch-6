import React from "react";
import PropTypes from "prop-types";
import {Link, useParams} from "react-router-dom";
import {getDurationFromMinutes, getRatingDescription} from "../../utils/utils";

import {movieType, reviewsType} from "../../utils/prop-types";
import Review from "../reviews/review";

export const tabStates = {
  TAB_OVERVIEW: `tab_overview`,
  TAB_DETAILS: `tab_details`,
  TAB_REVIEWS: `tab_reviews`,
};

const Tabs = (props) => {

  const {movie, reviews, selectedTab} = props;
  const {id} = useParams();

  const {runTime, scoresCount, genre, released, rating, director, description, starring} = movie;
  const {hours, minutes} = getDurationFromMinutes(runTime);

  const actorsReducer = (acc, value) => {
    return `${acc}, ${value}`;
  };
  const actorsList = starring.reduce(actorsReducer);

  const starringReducer = (acc, value) => {
    return (
      <>
        {acc},<br/>
        {value}
      </>);
  };
  const starringList = starring.reduce(starringReducer);

  const overviewTab =
    <>
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className="movie-nav__item movie-nav__item--active">
            <a className="movie-nav__link">Overview</a>
          </li>
          <li className="movie-nav__item">
            <Link to={`/films/${id}/details`} className="movie-nav__link">Details</Link>
          </li>
          <li className="movie-nav__item">
            <Link to={`/films/${id}/review` } className="movie-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRatingDescription(rating)}</span>
          <span className="movie-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {actorsList} and other</strong></p>
      </div>
    </>;

  const detailsTab =
    <>
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className="movie-nav__item">
            <Link to={`/films/${id}`} className="movie-nav__link">Overview</Link>
          </li>
          <li className="movie-nav__item movie-nav__item--active">
            <a className="movie-nav__link">Details</a>
          </li>
          <li className="movie-nav__item">
            <Link to={`/films/${id}/review`} className="movie-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>

      <div className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{director}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value">
              {starringList}
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">{hours}h {minutes}m</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{released}</span>
          </p>
        </div>
      </div>
    </>;

  const reviewsTab =
    <>
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className="movie-nav__item">
            <Link to={`/films/${id}`} className="movie-nav__link">Overview</Link>
          </li>
          <li className="movie-nav__item">
            <Link to={`/films/${id}/details`} className="movie-nav__link">Details</Link>
          </li>
          <li className="movie-nav__item movie-nav__item--active">
            <a className="movie-nav__link">Reviews</a>
          </li>
        </ul>
      </nav>
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          <Review review={reviews[0]}/>
          <Review review={reviews[0]}/>
          <Review review={reviews[0]}/>
        </div>
        <div className="movie-card__reviews-col">
          <Review review={reviews[0]}/>
          <Review review={reviews[0]}/>
          <Review review={reviews[0]}/>
        </div>
      </div>
    </>;

  let tab;

  switch (selectedTab) {
    case tabStates.TAB_OVERVIEW:
      tab = overviewTab;
      break;
    case tabStates.TAB_DETAILS:
      tab = detailsTab;
      break;
    case tabStates.TAB_REVIEWS:
      tab = reviewsTab;
      break;
    default:
      tab = overviewTab;
  }

  return (
    <div className="movie-card__desc">
      {tab}
    </div>
  );
};

Tabs.propTypes = {
  movie: movieType,
  reviews: reviewsType,
  selectedTab: PropTypes.string.isRequired
};

export default Tabs;

import React from "react";
import {useState} from "react";
import {getDurationFromMinutes, getRatingDescription} from "../../utils/utils";
import {movieType, reviewsType} from "../../utils/prop-types";
import Review from "../reviews/review";

export const TabStates = {
  OVERVIEW: `overview`,
  DETAILS: `details`,
  REVIEWS: `reviews`,
};

const Tabs = (props) => {

  const {movie, reviews} = props;
  const [activeTab, setActiveTab] = useState(TabStates.OVERVIEW);

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

  switch (activeTab) {
    case TabStates.OVERVIEW:
      tab = overviewTab;
      break;
    case TabStates.DETAILS:
      tab = detailsTab;
      break;
    case TabStates.REVIEWS:
      tab = reviewsTab;
      break;
    default:
      tab = overviewTab;
  }

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className={`movie-nav__item ${(activeTab === TabStates.OVERVIEW) ? `movie-nav__item--active` : ``}`}>
            {
              (activeTab === TabStates.OVERVIEW)
                ? <a className="movie-nav__link">Overview</a>
                : <a href="#" className="movie-nav__link" onClick={() => setActiveTab(TabStates.OVERVIEW)}>Overview</a>
            }
          </li>
          <li className={`movie-nav__item ${(activeTab === TabStates.DETAILS) ? `movie-nav__item--active` : ``}`}>
            {
              (activeTab === TabStates.DETAILS)
                ? <a className="movie-nav__link">Details</a>
                : <a href="#" onClick={() => setActiveTab(TabStates.DETAILS)} className="movie-nav__link">Details</a>
            }
          </li>
          <li className={`movie-nav__item ${(activeTab === TabStates.REVIEWS) ? `movie-nav__item--active` : ``}`}>
            {
              (activeTab === TabStates.REVIEWS)
                ? <a className="movie-nav__link">Reviews</a>
                : <a href="#" onClick={() => setActiveTab(TabStates.REVIEWS)} className="movie-nav__link">Reviews</a>
            }
          </li>
        </ul>
      </nav>
      {tab}
    </div>
  );
};

Tabs.propTypes = {
  movie: movieType.isRequired,
  reviews: reviewsType.isRequired,
};

export default Tabs;

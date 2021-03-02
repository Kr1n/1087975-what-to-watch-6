import React from "react";
import Review from "./review";
import MovieList from "../movie-list/movie-list";
import {moviesType, reviewsType} from "../../utils/prop-types";
import PropTypes from "prop-types";
import Svg from "../svg/svg";
import Header from "../header/header";
import Footer from "../footer/footer";
import {Link, useHistory, useParams} from "react-router-dom";

const Reviews = (props) => {
  const {relatedMoviesCount, movies, reviews} = props;
  const {id} = useParams();
  const history = useHistory();
  const {posterImage, name, genre, released, backgroundImage} = movies.find((item) => item.id === Number(id));

  return (
    <>
      <Svg/>

      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={() => history.push(`/player/${id}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button" onClick={() => history.push(`/mylist`)}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`/films/${id}/add-review`} className="btn movie-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={posterImage} alt={name} width="218"
                height="327"/>
            </div>

            <div className="movie-card__desc">
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
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            <MovieList movies={movies.slice(0, relatedMoviesCount)} />
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
};

Reviews.propTypes = {
  relatedMoviesCount: PropTypes.number.isRequired,
  movies: moviesType,
  reviews: reviewsType
};

export default Reviews;

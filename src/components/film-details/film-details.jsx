import React from 'react';
import Svg from "../svg/svg";
import Header from "../header/header";
import Footer from "../footer/footer";
import MovieList from "../movie-list/movie-list";
import {Link, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {moviesType} from "../../utils/prop-types";


const FilmDetails = (props) => {
  const {relatedMoviesCount, movies} = props;
  const {id} = useParams();
  const {poster, title, genre, releaseYear, director, duration: {hours, minutes}, actors} = movies[Number(id)];

  const actorsReducer = (acc, value) => {
    return (
      <>
        {acc},<br/>
        {value}
      </>);
  };
  const actorsList = actors.reduce(actorsReducer);

  const genreReducer = (acc, value) => {
    return acc + `, ` + value;
  };
  const genreList = genre.reduce(genreReducer);
  return (
    <>
      <Svg/>

      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header title={``}/>

          <div className="movie-card__wrap">
            <div className='movie-card__desc'>
              <h2 className='movie-card__title'>{title}</h2>
              <p className='movie-card__meta'>
                <span className='movie-card__genre'>{genre[0]}</span>
                <span className='movie-card__year'>{releaseYear}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={poster} alt={title} width='218'
                height="327"/>
            </div>

            <div className="movie-card__desc">
              <nav className="movie-nav movie-card__nav">
                <ul className="movie-nav__list">
                  <li className="movie-nav__item">
                    <Link to={`/films/` + id} className="movie-nav__link">Overview</Link>
                  </li>
                  <li className="movie-nav__item movie-nav__item--active">
                    <a className="movie-nav__link">Details</a>
                  </li>
                  <li className="movie-nav__item">
                    <Link to={`/films/` + id + `/review` } className="movie-nav__link">Reviews</Link>
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
                      {actorsList}
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
                    <span className="movie-card__details-value">{genreList}</span>
                  </p>
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Released</strong>
                    <span className="movie-card__details-value">{releaseYear}</span>
                  </p>
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

FilmDetails.propTypes = {
  relatedMoviesCount: PropTypes.number.isRequired,
  movies: moviesType(),
};

export default FilmDetails;

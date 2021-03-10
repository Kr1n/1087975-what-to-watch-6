import React from "react";
import {Link, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {moviesType, reviewsType} from "../../utils/prop-types";
import MovieList from "../movie-list/movie-list";
import Header from "../header/header";
import Svg from "../svg/svg";
import Footer from "../footer/footer";
import Tabs from "../tabs/tabs";
import {ALL_GENRES, genres} from "../../consts/genres";
import {AppRoute} from "../../consts/common";
import {connect} from "react-redux";


const Film = (props) => {
  const {relatedMoviesCount, movies, reviews, onPlayButtonClick, onMyListButtonClick} = props;
  const {id} = useParams();

  const {backgroundImage, posterImage, name, genre, released} = movies.find((item) => item.id === Number(id));

  // const genreTitle = genres.find((item) => item.name === genre).title;
  const genreTitle = genre;
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
                <span className="movie-card__genre">{genreTitle}</span>
                <span className="movie-card__year">{released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={()=>onPlayButtonClick(id)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button" onClick={()=>onMyListButtonClick()}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`${AppRoute.FILM}/${id}${AppRoute.ADD_REVIEW}`} className="btn movie-card__button">Add review</Link>
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

            <Tabs
              movie={movies[id]}
              reviews={reviews}
            />
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

Film.propTypes = {
  relatedMoviesCount: PropTypes.number.isRequired,
  movies: moviesType,
  reviews: reviewsType,
  onPlayButtonClick: PropTypes.func.isRequired,
  onMyListButtonClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movies: (state.genre === ALL_GENRES) ? state.movieList : state.movieList.filter((item) => item.genre === state.genre),
});

export {Film};
export default connect(mapStateToProps)(Film);

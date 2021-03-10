import React from "react";
import PropTypes from "prop-types";
import {moviesType, movieType} from "../../utils/prop-types";
import MovieList from "../movie-list/movie-list";
import Svg from "../svg/svg";
import Header from "../header/header";
import Footer from "../footer/footer";
import GenreList from "../genre-list/genre-list";
import ShowMore from "../show-more/show-more";
import {connect} from "react-redux";
import {ALL_GENRES} from "../../consts/genres";

const MainPage = (props) => {
  const {promoMovie, moviesShowed, movies, onPlayButtonClick, onMyListButtonClick, isDataLoaded} = props;

  const loading = <div>Loading... </div>;

  return (
    <>
      <Svg/>

      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promoMovie.backgroundImage} alt={promoMovie.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header/>

        {isDataLoaded ?
          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src={promoMovie.posterImage} alt={`${promoMovie.name} poster`} width="218"
                  height="327"/>
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{promoMovie.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{promoMovie.genre}</span>
                  <span className="movie-card__year">{promoMovie.released}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button" onClick={()=>onPlayButtonClick(promoMovie.id)}>
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
                </div>
              </div>
            </div>
          </div> :
          loading
        }
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList />

          <div className="catalog__movies-list">
            <MovieList />
          </div>

          {(movies.length > moviesShowed) ? <ShowMore/> : ``}
        </section>

        <Footer/>
      </div>
    </>
  );
};

MainPage.propTypes = {
  moviesCount: PropTypes.number.isRequired,
  promoMovie: movieType,
  movies: moviesType,
  moviesShowed: PropTypes.number.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onMyListButtonClick: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  moviesShowed: state.moviesShowed,
  movies: (state.genre === ALL_GENRES) ? state.movieList : state.movieList.filter((item) => item.genre === state.genre),
  promoMovie: state.promoMovie,
  isDataLoaded: state.isDataLoaded
});

export {MainPage};
export default connect(mapStateToProps)(MainPage);

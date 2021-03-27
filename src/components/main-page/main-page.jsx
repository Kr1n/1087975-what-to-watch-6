import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {moviesType, movieType} from "../../utils/prop-types";
import MovieList from "../movie-list/movie-list";
import Svg from "../svg/svg";
import Footer from "../footer/footer";
import GenreList from "../genre-list/genre-list";
import ShowMore from "../show-more/show-more";
import {connect} from "react-redux";
import {AppRoute} from "../../consts/common";
import {redirectToRoute, resetFilmCount} from "../../store/action";
import {fetchMovieList, fetchPromo, toggleFavorite} from "../../store/api-actions";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {getShowedMovieCount} from "../../store/main/selectors";
import {
  getLoadedDataStatus,
  getLoadedPromoStatus,
  getMoviesToShow,
  getPromoMovie,
} from "../../store/movies-data/selectors";
import FilmCard from "../film-card/film-card";
import Loading from "../loading/loading";

const MainPage = (props) => {
  const {promoMovie, movies, isPromoLoaded, loadPromo, onLeaveMainPage, loadMovies, isDataLoaded} = props;

  useEffect(() => {
    if (!isPromoLoaded) {
      loadPromo();
    }
  });

  useEffect(() => {
    loadMovies();
  }, [isDataLoaded]);

  useEffect(() => {
    return onLeaveMainPage;
  }, []);

  return (
    <>
      <Svg/>
      {
        (promoMovie) ?
          <FilmCard movie={promoMovie} /> :
          <Loading/>
      }
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList />

          <div className="catalog__movies-list">
            <MovieList movies={movies}/>
          </div>
          <ShowMore/>
        </section>

        <Footer/>
      </div>
    </>
  );
};

MainPage.propTypes = {
  promoMovie: movieType,
  movies: moviesType.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  isPromoLoaded: PropTypes.bool.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
  loadPromo: PropTypes.func.isRequired,
  onLeaveMainPage: PropTypes.func.isRequired,
  loadMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  moviesShowed: getShowedMovieCount(state),
  movies: getMoviesToShow(state),
  promoMovie: getPromoMovie(state),
  isDataLoaded: getLoadedDataStatus(state),
  isPromoLoaded: getLoadedPromoStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  redirectToLogin() {
    dispatch(redirectToRoute(AppRoute.LOGIN));
  },
  onFavoriteClick(id, isFavorite) {
    dispatch(toggleFavorite(id, isFavorite));
  },
  loadPromo() {
    dispatch(fetchPromo());
  },
  loadMovies() {
    dispatch(fetchMovieList());
  },
  onLeaveMainPage() {
    dispatch(resetFilmCount());
  }
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

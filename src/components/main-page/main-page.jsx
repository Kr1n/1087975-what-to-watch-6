import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {moviesType, movieType} from "../../utils/prop-types";
import MovieList from "../movie-list/movie-list";
import Svg from "../svg/svg";
import Header from "../header/header";
import Footer from "../footer/footer";
import GenreList from "../genre-list/genre-list";
import ShowMore from "../show-more/show-more";
import {connect} from "react-redux";
import Loading from "../loading/loading";
import {AppRoute, AuthorizationStatus} from "../../consts/common";
import {redirectToRoute, resetFilmCount} from "../../store/action";
import {fetchMovieList, fetchPromo, toggleFavorite} from "../../store/api-actions";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {getShowedMovieCount} from "../../store/main/selectors";
import {getLoadedPromoStatus, getMovieListByGenre, getPromoMovie} from "../../store/movies-data/selectors";


const MainPage = (props) => {
  const {promoMovie, moviesShowed, movies, onPlayButtonClick, onFavoriteClick, isPromoLoaded, authorizationStatus, redirectToLogin, loadPromo, onLeaveMainPage, loadMovies} = props;

  const onMylistClick = () => onFavoriteClick(promoMovie.id, !promoMovie.isFavorite);
  const mylistAction = (authorizationStatus === AuthorizationStatus.AUTH) ? onMylistClick : redirectToLogin;

  useEffect(() => {
    if (!isPromoLoaded) {
      loadPromo();
    }
  }, [isPromoLoaded]);

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    return onLeaveMainPage;
  }, []);

  return (
    <>
      <Svg/>

      <section className="movie-card">
        <div className="movie-card__bg">
          {isPromoLoaded ? <img src={promoMovie.backgroundImage} alt={promoMovie.name}/> : ``}
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header/>

        {isPromoLoaded ?
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
                  <button className="btn btn--list movie-card__button" type="button" onClick={mylistAction}>
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      {
                        promoMovie.isFavorite ?
                          <use xlinkHref="#in-list"></use> :
                          <use xlinkHref="#add"></use>
                      }
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div> :
          <Loading/>
        }
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList />

          <div className="catalog__movies-list">
            <MovieList movies={movies.slice(0, moviesShowed)}/>
          </div>

          {(movies.length > moviesShowed) ? <ShowMore/> : ``}
        </section>

        <Footer/>
      </div>
    </>
  );
};

MainPage.propTypes = {
  promoMovie: movieType,
  movies: moviesType.isRequired,
  moviesShowed: PropTypes.number.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  isPromoLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
  loadPromo: PropTypes.func.isRequired,
  onLeaveMainPage: PropTypes.func.isRequired,
  loadMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  moviesShowed: getShowedMovieCount(state),
  movies: getMovieListByGenre(state),
  promoMovie: getPromoMovie(state),
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

import React, {useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {moviesType, movieType} from "../../utils/prop-types";
import MovieList from "../movie-list/movie-list";
import Header from "../header/header";
import Svg from "../svg/svg";
import Footer from "../footer/footer";
import Tabs from "../tabs/tabs";
import {AppRoute, AuthorizationStatus, RELATED_MOVIES_COUNT} from "../../consts/common";
import {connect} from "react-redux";
import Loading from "../loading/loading";
import {redirectToRoute} from "../../store/action";
import {fetchMovie, fetchMovieList, toggleFavorite} from "../../store/api-actions";
import {
  getLoadedDataStatus,
  getLoadedFilmId,
  getMovie,
  getRelatedMovies,
} from "../../store/movies-data/selectors";
import {getAuthorizationStatus} from "../../store/user/selectors";


const Film = (props) => {
  const {movie, onFavoriteClick, redirectToLogin, authorizationStatus, loadFilm, loadedFilmId, loadFilms, isDataLoaded, relatedMovies} = props;
  const {id} = useParams();

  const history = useHistory();
  const onPlayButtonClick = (filmId) => history.push(`${AppRoute.PLAYER}/${filmId}`);

  useEffect(() => {
    if (!isDataLoaded) {
      loadFilms();
    }

    if (loadedFilmId !== Number(id)) {
      loadFilm(id);
    }
  }, [id, loadedFilmId]);


  const addReviewLink = (authorizationStatus === AuthorizationStatus.AUTH) ?
    <Link to={`${AppRoute.FILM}/${id}${AppRoute.ADD_REVIEW}`} className="btn movie-card__button">Add review</Link> : ``;

  let filmComponent;

  if (loadedFilmId === Number(id)) {
    const {backgroundImage, backgroundColor, posterImage, name, genre, released} = movie;
    const genreTitle = genre;

    const onMyListClick = () => onFavoriteClick(id, !movie.isFavorite);
    const myListAction = (authorizationStatus === AuthorizationStatus.AUTH) ? onMyListClick : redirectToLogin;

    const fullDescription = <>
      <section className="movie-card movie-card--full" style={{backgroundColor}}>
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
                <button className="btn btn--play movie-card__button" type="button" onClick={() => onPlayButtonClick(id)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button" onClick={myListAction}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    {
                      movie.isFavorite ?
                        <use xlinkHref="#in-list"></use> :
                        <use xlinkHref="#add"></use>
                    }
                  </svg>
                  <span>My list</span>
                </button>
                {addReviewLink}
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
              movie={movie}
            />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            <MovieList movies={relatedMovies.slice(0, RELATED_MOVIES_COUNT)} />
          </div>
        </section>


      </div>
    </>;

    filmComponent = fullDescription;
  } else {
    filmComponent = <Loading/>;
  }

  return (
    <>
      <Svg/>
      {filmComponent}
      <Footer/>
    </>
  );
};

Film.propTypes = {
  movie: movieType,
  relatedMovies: moviesType,
  onFavoriteClick: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
  loadFilm: PropTypes.func.isRequired,
  loadFilms: PropTypes.func.isRequired,
  loadedFilmId: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  isDataLoaded: getLoadedDataStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
  loadedFilmId: getLoadedFilmId(state),
  movie: getMovie(state),
  relatedMovies: getRelatedMovies(state)
});

const mapDispatchToProps = (dispatch) => ({
  redirectToLogin() {
    dispatch(redirectToRoute(AppRoute.LOGIN));
  },
  onFavoriteClick(id, isFavorite) {
    dispatch(toggleFavorite(id, isFavorite));
  },
  loadFilm(id) {
    dispatch(fetchMovie(id));
  },
  loadFilms(id) {
    dispatch(fetchMovieList(id));
  }

});

export {Film};
export default connect(mapStateToProps, mapDispatchToProps)(Film);

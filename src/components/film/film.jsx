import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {moviesType, movieType, reviewsType} from "../../utils/prop-types";
import MovieList from "../movie-list/movie-list";
import Header from "../header/header";
import Svg from "../svg/svg";
import Footer from "../footer/footer";
import Tabs from "../tabs/tabs";
import {AppRoute, AuthorizationStatus} from "../../consts/common";
import {connect} from "react-redux";
import Loading from "../loading/loading";
import {ActionCreator} from "../../store/action";
import {fetchMovie, toggleFavorite} from "../../store/api-actions";


const Film = (props) => {
  const {relatedMoviesCount, movies, movie, reviews, onPlayButtonClick, onFavoriteClick, redirectToLogin, authorizationStatus, loadFilm, loadedFilmId} = props;
  const {id} = useParams();

  useEffect(() => {
    loadFilm(id);
  }, [id]);

  const addReviewLink = (authorizationStatus === AuthorizationStatus.AUTH) ?
    <Link to={`${AppRoute.FILM}/${id}${AppRoute.ADD_REVIEW}`} className="btn movie-card__button">Add review</Link> : ``;

  let filmComponent;

  if (loadedFilmId === Number(id)) {
    const {backgroundImage, posterImage, name, genre, released} = movie;
    const relatedMovies = movies.filter((item) => item.genre === genre);
    const genreTitle = genre;

    const onMylistClick = () => onFavoriteClick(id, !movie.isFavorite);
    const mylistAction = (authorizationStatus === AuthorizationStatus.AUTH) ? onMylistClick : redirectToLogin;

    const fullDescription = <>
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
                <button className="btn btn--play movie-card__button" type="button" onClick={() => onPlayButtonClick(id)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button" onClick={mylistAction}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
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
              reviews={reviews}
            />
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            <MovieList movies={relatedMovies.slice(0, relatedMoviesCount)} />
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
  relatedMoviesCount: PropTypes.number.isRequired,
  movie: movieType,
  movies: moviesType.isRequired,
  reviews: reviewsType.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
  loadFilm: PropTypes.func.isRequired,
  loadedFilmId: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  movies: state.movieList,
  isDataLoaded: state.isDataLoaded,
  authorizationStatus: state.authorizationStatus,
  loadedFilmId: state.loadedFilmId,
  movie: state.movie,
});

const mapDispatchToProps = (dispatch) => ({
  redirectToLogin() {
    dispatch(ActionCreator.redirectToRoute(AppRoute.LOGIN));
  },
  onFavoriteClick(id, isFavorite) {
    dispatch(toggleFavorite(id, isFavorite));
  },
  loadFilm(id) {
    dispatch(fetchMovie(id));
  }
});

export {Film};
export default connect(mapStateToProps, mapDispatchToProps)(Film);

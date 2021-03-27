import React from "react";
import Header from "../header/header";
import {connect} from "react-redux";
import {AppRoute, AuthorizationStatus} from "../../consts/common";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {getMovieList} from "../../store/movies-data/selectors";
import {redirectToRoute} from "../../store/action";
import {toggleFavorite} from "../../store/api-actions";
import {movieType} from "../../utils/prop-types";

const FilmCard = (props) => {
  const {movie, authorizationStatus, redirectToLogin, onFavoriteClick} = props;

  const history = useHistory();
  const onPlayButtonClick = (id) => history.push(`${AppRoute.PLAYER}/${id}`);

  const onMylistClick = () => onFavoriteClick(movie.id, !movie.isFavorite);
  const mylistAction = (authorizationStatus === AuthorizationStatus.AUTH) ? onMylistClick : redirectToLogin;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={movie.backgroundImage} alt={movie.name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header/>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={movie.posterImage} alt={`${movie.name} poster`} width="218"
              height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{movie.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{movie.genre}</span>
              <span className="movie-card__year">{movie.released}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button" onClick={()=>onPlayButtonClick(movie.id)}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button" onClick={mylistAction}>
                <svg viewBox="0 0 19 20" width="19" height="20">
                  {
                    movie.isFavorite ?
                      <use xlinkHref="#in-list"></use> :
                      <use xlinkHref="#add"></use>
                  }
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FilmCard.propTypes = {
  movie: movieType,
  onFavoriteClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  movies: getMovieList(state),
});

const mapDispatchToProps = (dispatch) => ({
  redirectToLogin() {
    dispatch(redirectToRoute(AppRoute.LOGIN));
  },
  onFavoriteClick(id, isFavorite) {
    dispatch(toggleFavorite(id, isFavorite));
  },
});

export {FilmCard};
export default connect(mapStateToProps, mapDispatchToProps)(FilmCard);

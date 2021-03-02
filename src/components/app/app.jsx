import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import MainPage from "../main-page/main-page";
import Page404 from "../page-404/page-404";
import SignIn from "../sign-in/sign-in";
import MyList from "../my-list/my-list";
import Film from "../film/film";
import Player from "../player/player";
import Reviews from "../reviews/reviews";
import PropTypes from "prop-types";
import {moviesType, reviewsType, movieType} from "../../utils/prop-types";
import FilmDetails from "../film-details/film-details";
import AddReview from "../add-review/add-review";


const App = (props) => {
  const {relatedMoviesCount, moviesInMyList, moviesCount, movies, promoMovie, reviews} = props;
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage
            moviesCount={moviesCount}
            promoMovie={promoMovie}
            movies={movies}
          />
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/mylist">
          <MyList
            moviesCount={moviesInMyList}
            movies={movies}
          />
        </Route>
        <Route exact path="/films/:id/add-review">
          <AddReview
            movies={movies}
          />
        </Route>
        <Route exact path="/films/:id/details">
          <FilmDetails
            relatedMoviesCount={relatedMoviesCount}
            movies={movies}
          />
        </Route>
        <Route exact path="/films/:id/review">
          <Reviews
            relatedMoviesCount={relatedMoviesCount}
            movies={movies}
            reviews={reviews}
          />
        </Route>
        <Route exact path="/films/:id">
          <Film
            relatedMoviesCount={relatedMoviesCount}
            movies={movies}
          />
        </Route>
        <Route exact path="/player/:id">
          <Player
            movies={movies}
          />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  relatedMoviesCount: PropTypes.number.isRequired,
  moviesInMyList: PropTypes.number.isRequired,
  moviesCount: PropTypes.number.isRequired,
  promoMovie: movieType,
  movies: moviesType,
  reviews: reviewsType
};

export default App;


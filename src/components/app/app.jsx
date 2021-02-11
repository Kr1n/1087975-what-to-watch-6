import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import Page404 from '../page-404/page-404';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import Player from '../player/player';
import Reviews from '../reviews/reviews';
import PropTypes from 'prop-types';
import {filmsType, reviewsType} from "../../utils/prop-types";


const App = (props) => {
  const {relatedMoviesCount, moviesInMyList, moviesCount, genre, title, releaseYear} = props;
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <MainPage
            moviesCount = {moviesCount}
            genre = {genre}
            title = {title}
            releaseYear = {releaseYear}
          />
        </Route>
        <Route exact path='/login'>
          <SignIn />
        </Route>
        <Route exact path='/mylist'>
          <MyList
            moviesCount={moviesInMyList}
          />
        </Route>
        <Route exact path='/films/:id/review'>
          <Reviews relatedMoviesCount={relatedMoviesCount}/>
        </Route>
        <Route exact path='/films/:id'>
          <Film relatedMoviesCount={relatedMoviesCount}/>
        </Route>
        <Route exact path='/player/:id'>
          <Player />
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
  genre: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  releaseYear: PropTypes.number.isRequired,
  films: filmsType(),
  reviews: reviewsType()
};

export default App;


import React from "react";
import {connect} from "react-redux";
import MovieList from "../movie-list/movie-list";
import {moviesType} from "../../utils/prop-types";
import Footer from "../footer/footer";
import Header from "../header/header";
import Svg from "../svg/svg";

const MyList = (props) => {
  const {movies} = props;
  return (
    <>
      <Svg/>

      <div className="user-page">
        <Header title="My list"/>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__movies-list">
            <MovieList
              movies={movies}
            />
          </div>
        </section>

        <Footer/>
      </div>
    </>);
};


MyList.propTypes = {
  movies: moviesType,
};

const mapStateToProps = (state) => ({
  movies: state.movieList.filter((movie) => movie.isFavorite),
});

export {MyList};
export default connect(mapStateToProps)(MyList);

import React, {useEffect} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MovieList from "../movie-list/movie-list";
import {moviesType} from "../../utils/prop-types";
import Footer from "../footer/footer";
import Header from "../header/header";
import Svg from "../svg/svg";
import {fetchFavoriteList} from "../../store/api-actions";
import Loading from "../loading/loading";

const MyList = (props) => {
  const {movies, isFavoriteLoaded, loadFavoriteList} = props;

  useEffect(() => {
    loadFavoriteList();
  }, [isFavoriteLoaded]);

  let favoriteComponent;


  if (isFavoriteLoaded) {
    favoriteComponent =
      <MovieList
        movies={movies}
      />
    ;
  } else {
    favoriteComponent = <Loading/>;
  }

  return (
    <>
      <Svg/>

      <div className="user-page">
        <Header title="My list"/>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__movies-list">
            {favoriteComponent}
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
};


MyList.propTypes = {
  movies: moviesType.isRequired,
  isFavoriteLoaded: PropTypes.bool.isRequired,
  loadFavoriteList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movies: state.favoriteList,
  isFavoriteLoaded: state.isFavoriteLoaded
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteList() {
    dispatch(fetchFavoriteList());
  }
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);

import React from 'react';
import Svg from "../svg/svg";
import {useParams} from "react-router-dom";
import {moviesType} from "../../utils/prop-types";
import Header from "../header/header";

const AddReview = (props) => {
  const {movies} = props;
  const {id} = useParams();
  const {cover, poster, title} = movies[Number(id)];

  return (
    <>
      <Svg/>

      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={cover} alt={title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header link={{
            title,
            href: `films/${id}`}}/>
          <div className="movie-card__poster movie-card__poster--small">
            <img src={poster} alt={poster + `poster`} width="218"
              height="327"/>
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form">
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2"/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" checked=""/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4"/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5"/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>

                <input className="rating__input" id="star-6" type="radio" name="rating" value="6"/>
                <label className="rating__label" htmlFor="star-6">Rating 6</label>

                <input className="rating__input" id="star-7" type="radio" name="rating" value="7"/>
                <label className="rating__label" htmlFor="star-7">Rating 7</label>

                <input className="rating__input" id="star-8" type="radio" name="rating" value="8"
                  checked=""/>
                <label className="rating__label" htmlFor="star-8">Rating 8</label>

                <input className="rating__input" id="star-9" type="radio" name="rating" value="9"/>
                <label className="rating__label" htmlFor="star-9">Rating 9</label>

                <input className="rating__input" id="star-10" type="radio" name="rating" value="10"/>
                <label className="rating__label" htmlFor="star-10">Rating 10</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text"
                placeholder="Review text"></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit">Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>

    </>
  );
};

AddReview.propTypes = {
  movies: moviesType(),
};

export default AddReview;

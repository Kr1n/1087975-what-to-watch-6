import React, {useRef, useState} from "react";
import Svg from "../svg/svg";
import {useParams} from "react-router-dom";
import {moviesType} from "../../utils/prop-types";
import Header from "../header/header";
import {connect} from "react-redux";
import {AppRoute, STAR_COUNT} from "../../consts/common";
import {postReview} from "../../store/api-actions";
import PropTypes from "prop-types";
import {getMovieList} from "../../store/movies-data/selectors";

const AddReview = (props) => {
  const {movies, addReview} = props;
  const {id} = useParams();
  const movie = movies.find((item) => item.id === Number(id));

  const [rating, ratingChange] = useState(undefined);
  const [reviewLength, reviewLengthChange] = useState(0);
  const [isReviewSended, isReviewSendedChange] = useState(false);
  const refReview = useRef();
  const refForm = useRef();

  const {backgroundImage, backgroundColor, posterImage, name} = movie;

  const onAddReviewClick = (evt, commentRating, comment) => {
    evt.preventDefault();

    if (!refReview.current.value) {
      refReview.current.placeholder = `Please enter your text.`;
      return;
    }
    isReviewSendedChange(true);
    addReview(movie.id, {rating: commentRating, comment});
  };

  const onRatingChange = (e) => {
    ratingChange(e.currentTarget.value);
  };

  const onReviewChange = (e) => {
    reviewLengthChange(e.currentTarget.value.length);
  };

  const starList = [...Array(STAR_COUNT)].map((item, index) =>
    <>
      <input key={`input${index + 1}`} className="rating__input" id={`star-${index + 1}`} data-testid={`star-${index + 1}`} type="radio" name="rating" value={index + 1} checked={Number(rating) === index + 1} onChange={onRatingChange}/>
      <label key={`label${index + 1}`} className="rating__label" htmlFor={`star-${index + 1}`}>Rating {index + 1}</label>
    </>
  );

  const isDisabled = (rating && reviewLength > 50 && !isReviewSended) ? false : true;

  return (
    <>
      <Svg/>

      <section className="movie-card movie-card--full" style={{backgroundColor}}>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header link={{
            name,
            href: `${AppRoute.FILM}/${id}`}}
          />

          <div className="movie-card__poster movie-card__poster--small">
            <img src={posterImage} alt={`${name} poster`} width="218"
              height="327"/>
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form"
            ref={refForm}
            onSubmit={(evt) => onAddReviewClick(evt, refForm.current.rating.value, refReview.current.value)}
          >
            <div className="rating">
              <div className="rating__stars">
                {starList}
              </div>
            </div>

            <div className="add-review__text">
              <textarea ref={refReview} className="add-review__textarea" name="review-text" id="review-text" data-testid="review-text"
                placeholder="Review text" onChange={onReviewChange} maxLength="400"></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled={isDisabled} data-testid="button-submit">Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>

    </>
  );
};

AddReview.propTypes = {
  movies: moviesType.isRequired,
  addReview: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovieList(state),
});

const mapDispatchToProps = (dispatch) => ({
  addReview(id, review) {
    dispatch(postReview(id, review));
  },
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);


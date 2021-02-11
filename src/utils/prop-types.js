import PropTypes from 'prop-types';

export const filmsType = () =>
  PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    releaseDate: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    src: PropTypes.string.isRequired,

    duration: PropTypes.shape({
      minutes: PropTypes.number.isRequired,
      hours: PropTypes.number.isRequired
    }),

    rate: PropTypes.shape({
      score: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired
    })
  }).isRequired);

export const reviewsType = () =>
  PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        filmId: PropTypes.number.isRequired,
        test: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired
      })
  );

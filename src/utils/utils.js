export const getDurationFromSeconds = (seconds) => {
  const minutes = (seconds - seconds % 60) / 60;
  const hours = (minutes - minutes % 60) / 60;

  return {
    hours,
    minutes,
    seconds: Math.floor(seconds % 60)
  };
};

export const getDurationFromMinutes = (minutes) => {
  return {
    hours: (minutes - minutes % 60) / 60,
    minutes: minutes % 60,
  };
};

export const getRatingDescription = (rating) => {
  const descriptions = [`Bad`, `Normal`, `Good`, `Very good`, `Awesome`];
  let i = 0;
  if (rating >= 3 && rating < 5) {
    i = 1;
  } else if (rating >= 5 && rating < 8) {
    i = 2;
  } else if (rating >= 8 && rating < 10) {
    i = 3;
  } else if (rating === 10) {
    i = 4;
  }
  return descriptions[i];
};


export const adaptMoviesToClient = (serverData) =>
  serverData.map((item) => ({
    id: item.id,
    name: item.name,
    posterImage: item.poster_image,
    previewImage: item.preview_image,
    backgroundImage: item.background_image,
    backgroundColor: item.background_color,
    videoLink: item.video_link,
    previewVideoLink: item.preview_video_link,
    description: item.description,
    rating: item.rating,
    scoresCount: item.scores_count,
    director: item.director,
    starring: item.starring,
    runTime: item.run_time,
    genre: item.genre,
    released: item.released,
    isFavorite: item.is_favorite,
  }));

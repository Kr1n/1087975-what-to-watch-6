export const getDurationFromMinutes = (minutes) => {
  return {
    hours: (minutes - minutes % 60) / 60,
    minutes: minutes - (minutes - minutes % 60)
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

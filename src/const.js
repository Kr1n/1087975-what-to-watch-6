export const genres = [`All genres`, `comedy`, `crime`, `documentary`, `drama`, `horror`, `family`, `romance`, `sci-fi`, `thriller`];

export const GenreType = {

  ALL: {
    text: `All genres`,
    filter: (items) => items
  },

  COMEDIES: {
    text: `Comedies`,
    filter: (items) => items.filter((item) => item.genre === `comedy`),
  },

  CRIME: {
    text: `Crime`,
    filter: (items) => items.filter((item) => item.genre === `crime`),
  },

  DOCUMENTARY: {
    text: `Documentary`,
    filter: (items) => items.filter((item) => item.genre === `documentary`),
  },

  DRAMA: {
    text: `Dramas`,
    filter: (items) => items.filter((item) => item.genre === `drama`),
  },

  HORROR: {
    text: `Horror`,
    filter: (items) => items.filter((item) => item.genre === `horror`),
  },

  FAMILY: {
    text: `Kids &amp; Family`,
    filter: (items) => items.filter((item) => item.genre === `family`),
  },

  ROMANCE: {
    text: `Romance`,
    filter: (items) => items.filter((item) => item.genre === `romance`),
  },

  SCI_FI: {
    text: `Sci-Fi`,
    filter: (items) => items.filter((item) => item.genre === `sci-fi`),
  },

  THRILLER: {
    text: `Thrillers`,
    filter: (items) => items.filter((item) => item.genre === `thriller`),
  }

};

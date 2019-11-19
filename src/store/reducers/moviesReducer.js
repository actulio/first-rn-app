import MOVIES from '../../data/movies';

const initialState = {
  movies: MOVIES,
  filteredMovies: MOVIES
};

const MoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 1:
      return state;
    default:
      return state;
  }
};

export default MoviesReducer;

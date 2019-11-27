import MOVIES from '../../data/movies';
import { TOGGLE_FAVORITE } from '../actions/moviesAction';

const initialState = {
  movies: MOVIES,
  favoriteMovies: []
};

const MoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      const existingIndex = state.favoriteMovies.findIndex(
        (movie) => movie.rank === action.movieRank
      );
      if (existingIndex >= 0) {
        const updatedFavMovies = [...state.favoriteMovies];
        updatedFavMovies.splice(existingIndex, 1);
        return { ...state, favoriteMovies: updatedFavMovies };
      }
      const movieObj = state.movies.find((movie) => movie.rank === action.movieRank);
      return { ...state, favoriteMovies: state.favoriteMovies.concat(movieObj) };
    }

    default:
      return state;
  }
};

export default MoviesReducer;

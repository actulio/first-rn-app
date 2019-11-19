import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as firebase from 'firebase';
import firebaseConfig from './src/constants/firebaseConfig';
import MoviesNavigator from './src/navigation/MoviesNavigator';
import moviesReducer from './src/store/reducers/moviesReducer';

const rootReducer = combineReducers({
  movies: moviesReducer
});

// Initialize Firebase
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <MoviesNavigator />
    </Provider>
  );
}

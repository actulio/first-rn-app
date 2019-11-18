import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Platform,
  StyleSheet
} from 'react-native';

import { useSelector } from 'react-redux';
import MovieItem from '../components/MovieItem';


import MOVIES from '../data/movies';

const MoviesScreen = (props) => {
  // const movies = useSelector((state) => state.movies.movies);

  // const movies = JSON.parse(MOVIES);
  const m = MOVIES;


  const renderListItem = (itemData) => (
    <MovieItem
      title={itemData.item.title}
      year={itemData.item.year}
      rating={itemData.item.rating}
      genre={itemData.item.genre}
      runtime={itemData.item.runtime}
      revenue={itemData.item.revenue}
    />
  );


  return (
    <View>
      <FlatList
        data={m}
        keyExtractor={(item) => `i-${item.rank}`}
        renderItem={renderListItem}
      />

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    height: 50,
  }
});

export default MoviesScreen;

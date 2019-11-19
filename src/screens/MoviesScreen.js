import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Keyboard
} from 'react-native';

import { SearchBar } from 'react-native-elements';

import { useSelector } from 'react-redux';
import MovieItem from '../components/MovieItem';
import Colors from '../constants/Colors';


const MoviesScreen = (props) => {
  const movies = useSelector((state) => state.movies.movies);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text) => {
    const query = text.toLowerCase();
    const filteredData = movies.filter((movie) => {
      const { title } = movie;
      return title.toLowerCase().includes(query);
    });
    setFilteredMovies(filteredData);
    setSearchQuery(query);
  };

  const renderListItem = (itemData) => (
    <MovieItem
      title={itemData.item.title}
      year={itemData.item.year}
      rating={itemData.item.rating}
      genre={itemData.item.genre}
      runtime={itemData.item.runtime}
      revenue={itemData.item.revenue}
      onSelectMovie={() => {
        props.navigation.navigate({
          routeName: 'MovieComments',
          params: {
            movieRank: itemData.item.rank,
            movieTitle: itemData.item.title,
          }
        });
      }}
    />
  );

  return (
    <View style={styles.container}>

      <SearchBar
        containerStyle={styles.searchBar}
        inputContainerStyle={{ backgroundColor: Colors.primaryColor }}
        inputStyle={{ fontSize: 16 }}
        placeholder="Search for a movie..."
        placeholderTextColor="#CCC"
        onChangeText={handleSearch}
        onClear={() => { Keyboard.dismiss(); }}
        value={searchQuery}
        round
        // lightTheme
        showCancel
      />
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => `i-${item.rank}`}
        renderItem={renderListItem}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No movies found.</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: Colors.primaryColor,
    borderTopColor: Colors.primaryColor
  }
});

export default MoviesScreen;

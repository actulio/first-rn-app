import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import MyHeaderButton from '../components/HeaderButton';
import MovieList from '../components/MovieList';

const FavoriteScreen = (props) => {
  const { navigation } = props;

  const movies = useSelector((state) => state.movies.favoriteMovies);

  return (
    <View style={styles.container}>
      <MovieList navigation={navigation} data={movies} />
    </View>
  );
};

FavoriteScreen.navigationOptions = (navData) => ({
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
      <Item
        title="Menu"
        iconName="ios-menu"
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default FavoriteScreen;

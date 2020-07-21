import React, { useState, useEffect, useCallback } from 'react';
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

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => { updateState({}); console.log(movies); }, []);
  const movies = useSelector((state) => state.movies.favoriteMovies);

  useEffect(() => {
    const willFocusListener = props.navigation.addListener('willFocus', forceUpdate);
    return () => {
      willFocusListener.remove();
    };
  }, [forceUpdate]);


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

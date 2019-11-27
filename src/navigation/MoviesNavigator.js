import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import MoviesScreen from '../screens/MoviesScreen';
import MovieCommentsScreen from '../screens/MovieCommentsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';


const defaultStackNavigationOptions = {
  headerTitle: 'Movies',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'blue',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : 'blue',
};

const MoviesNavigator = createStackNavigator(
  {
    MovieList: MoviesScreen,
    MovieComments: MovieCommentsScreen
  }, {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MovieComments: MovieCommentsScreen,
  }, {
    defaultNavigationOptions: {
      ...defaultStackNavigationOptions,
      headerTitle: 'Favorite Movies'
    }
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Movies: {
      screen: MoviesNavigator,
      navigationOptions: {
        drawerLabel: 'Movie List'
      }
    },
    Favorites: {
      screen: FavoritesNavigator,
      navigationOptions: {
        drawerLabel: 'Favorite Movies'
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: Colors.primaryColor,
    }
  }
);

export default createAppContainer(MainNavigator);

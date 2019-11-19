import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MoviesScreen from '../screens/MoviesScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import MovieCommentsScreen from '../screens/MovieCommentsScreen';
import Colors from '../constants/Colors';

const MoviesNavigator = createStackNavigator(
  {
    MovieList: {
      screen: MoviesScreen
    },
    MovieDetail: {
      screen: MovieDetailScreen
    },
    MovieComments: {
      screen: MovieCommentsScreen
    }
  }, {
    defaultNavigationOptions: {
      headerTitle: 'Movies',
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'blue',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : 'blue',
    }
  }
);

export default createAppContainer(MoviesNavigator);

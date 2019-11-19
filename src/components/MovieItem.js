import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MovieItem = (props) => {
  const PlatformTouchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  const {
    title, year, rating, genre, runtime, revenue, onSelectMovie
  } = props;

  return (
    <View style={styles.listItem}>
      <PlatformTouchable onPress={onSelectMovie}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>
              {title}
            </Text>
            <LinearGradient
              colors={['#EF0000', '#C651FF', '#6546ED']}
              start={{ x: 1.0, y: 0.0 }}
              end={{ x: 1.0, y: 1.0 }}
              style={styles.gradient}
            >
              <View style={styles.rating}>
                <Text>
                  {rating}
                </Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.textInfo}>
                {`${year} - ${Math.floor(runtime / 60)}h${runtime % 60}min`}
              </Text>
              <Text style={styles.textInfo}>
                {genre.join(', ')}
              </Text>
            </View>
            <View>
              <Text style={{ ...styles.textInfo, marginTop: 10 }}>
                { revenue.length > 0 ? `$ ${revenue} M` : '$ 0 M'}
              </Text>
            </View>

          </View>
        </View>

      </PlatformTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    margin: 5,
    height: 90,
    borderRadius: 5,
    elevation: 3,
    overflow:
    Platform.OS === 'android' && Platform.Version >= 21
      ? 'hidden'
      : 'visible',
  },
  container: {
    flex: 1,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    padding: 20,
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
  },
  textInfo: {
    fontSize: 11,
    color: '#808080'
  },
  rating: {
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  gradient: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginTop: -4,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default MovieItem;

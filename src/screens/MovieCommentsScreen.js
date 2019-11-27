import React, { useState, useEffect, useCallback } from 'react';

import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '../constants/firebaseConfig';

import MyHeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { toggleFavorite } from '../store/actions/moviesAction';
import '../../fixTimerBug';

const MovieCommentsScreen = (props) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [appLoading, setAppLoading] = useState(true);

  const { navigation } = props;
  const movieRank = navigation.getParam('movieRank');
  const movieTitle = navigation.getParam('movieTitle');
  const dispatch = useDispatch();

  const docRef = firestore.doc(`movies/${movieTitle.toLowerCase().replace(/\s/g, '-')}`);

  const currentMovieIsFav = useSelector((state) => state.movies.favoriteMovies.some(
    (movie) => movie.rank === movieRank
  ));

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(movieRank));
  }, [dispatch, movieRank]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMovieIsFav });
  }, [currentMovieIsFav]);

  useEffect(() => {
    docRef.get().then((doc) => {
      setAppLoading(false);
      if (doc && doc.exists) {
        setComments(doc.data().comments);
      }
    });
  }, []);

  const handleSendComment = () => {
    docRef
      .set({ comments: [...comments, newComment], })
      .then(() => { console.log('Saved successfully'); })
      .catch((error) => { console.error('Error adding document: ', error); });

    setComments([...comments, newComment]);
    setNewComment('');
  };

  const renderMessages = (itemData) => (
    <View style={styles.commentContainer}>
      <View style={styles.thumbnail}>
        {/* Possible avatar here */}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{itemData.item}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={80}
      style={{ flex: 1 }}
    >
      { appLoading && (
      <ActivityIndicator style={styles.loading} size="large" color={Colors.primaryColor} animating={appLoading} />
      )}
      { comments.length === 0 && !appLoading && (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.primaryColor }}>No comments yet, be the first to add one. </Text>
      </View>
      )}

      <View>
        <FlatList
          data={comments}
          keyExtractor={(item, index) => `i-${index.toString()}`}
          renderItem={renderMessages}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            placeholder="Your comment here"
            autoCorrect
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
            <Ionicons name="md-send" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

MovieCommentsScreen.navigationOptions = (navigationData) => {
  const title = navigationData.navigation.getParam('movieTitle');
  const toggleFav = navigationData.navigation.getParam('toggleFav');
  const isFav = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFav ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFav}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  commentContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.primaryColor,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    textAlign: 'justify',
    margin: 10,
  },
  commentInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.primaryColor,
    padding: 5,
    marginRight: 5,
    // backgroundColor: '#fff',
    // color: '#424242',
    flex: 1,
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    height: 30,
    width: 30,
    borderRadius: 15
  },
  loading: {
    flex: 1,
    alignSelf: 'center'
  },
});

export default MovieCommentsScreen;

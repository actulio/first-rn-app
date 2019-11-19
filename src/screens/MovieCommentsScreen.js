import React, { useState, useEffect } from 'react';

import {
  View, Text, KeyboardAvoidingView, StyleSheet, FlatList, TextInput, TouchableOpacity
} from 'react-native';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import firebaseDb from '../constants/firebaseConfig';


import Colors from '../constants/Colors';

const MovieCommentsScreen = (props) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  // eslint-disable-next-line react/destructuring-assignment
  const movieTitle = props.navigation.getParam('movieTitle');
  const docRef = firebaseDb.doc(`movies/${movieTitle.toLowerCase().replace(/\s/g, '-')}`);

  const resetTimeout = () => {
    const highestTimeoutId = setTimeout(() => ';');
    for (let i = 0; i < highestTimeoutId; i += 1) {
      clearTimeout(i);
    }
  };

  useEffect(() => {
    docRef.get().then((doc) => {
      resetTimeout();
      if (doc && doc.exists) {
        setComments(doc.data().comments);
      }
    });
  }, []);

  const handleSendComment = () => {
    docRef
      .set({ comments: [...comments, newComment], })
      .then(() => { resetTimeout(); console.log('Saved successfully'); })
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
  return {
    headerTitle: title,
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
  }
});

export default MovieCommentsScreen;

import React, { useState } from 'react';

import {
  View, Text, KeyboardAvoidingView, StyleSheet, FlatList, TextInput, TouchableOpacity
} from 'react-native';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const MovieCommentsScreen = () => {
  const [myComment, setMyComment] = useState('');

  const messages = [
    { id: 1, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { id: 2, message: 'alo amor' },
    { id: 3, message: 'olá belezinha' }];

  const renderMessages = (itemData) => (
    <View style={styles.commentContainer}>
      <View style={styles.thumbnail}>
        {/* Possible thumbnail here */}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{itemData.item.message}</Text>
      </View>
    </View>
  );


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#FFF' }}
    >
      {/* <View> */}
      <View>
        <FlatList
          data={messages}
          keyExtractor={(item) => `i-${item.id}`}
          renderItem={renderMessages}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            placeholder="Your comment here"
            autoCorrect
            value={myComment}
            onChangeText={(text) => setMyComment(text)}
          />
          <TouchableOpacity style={styles.sendButton}>
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

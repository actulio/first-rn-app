// rename this file to firebaseConfig.js and add YOUR credentials
import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'api-key',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appID: 'app-id',
};

firebase.initializeApp(config);
const firebaseDb = firebase.firestore();

export default firebaseDb;

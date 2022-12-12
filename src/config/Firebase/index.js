import * as firebase from 'firebase/app';

const FirebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyBNQvEN6mDyLswIW_eJCC1xbC1kN0WwKzA',
  authDomain: 'mydoctor-769d8.firebaseapp.com',
  projectId: 'mydoctor-769d8',
  storageBucket: 'mydoctor-769d8.appspot.com',
  messagingSenderId: '240048277741',
  appId: '1c1cc56edb230fa3ece4e4',
  databaseURL: 'https://mydoctor-769d8-default-rtdb.firebaseio.com',
});

export default FirebaseConfig;

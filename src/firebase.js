import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase
  .initializeApp({  
    apiKey: "AIzaSyAGKY4x6zFr6bRCHFY8VUW4rqGCwmwGzg4",
    authDomain: "tej-tunes.firebaseapp.com",
    databaseURL: "https://tej-tunes.firebaseio.com",
    projectId: "tej-tunes",
    storageBucket: "tej-tunes.appspot.com",
    messagingSenderId: "922683197466",
    appId: "1:922683197466:web:dd415e7f3129231687e9a3"
  })
  .firestore()
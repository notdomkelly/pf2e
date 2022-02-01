import { boot } from 'quasar/wrappers'
// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAW9NW17B2Ymauu_WqEOQKrcz9RekM4SzY',
  authDomain: 'pathfinder-2e-tools.firebaseapp.com',
  projectId: 'pathfinder-2e-tools',
  storageBucket: 'pathfinder-2e-tools.appspot.com',
  messagingSenderId: '724498973818',
  appId: '1:724498973818:web:1612b379a2d25ea98267c3',
  measurementId: 'G-YDPSQG9B1V'
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

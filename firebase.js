// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBqfCOPRIYfmCaaOXi1JXw-SZfiBRyy_QU",
  authDomain: "hellokit-ffabb.firebaseapp.com",
  projectId: "hellokit-ffabb",
  storageBucket: "hellokit-ffabb.appspot.com",
  messagingSenderId: "1007675078481",
  appId: "1:1007675078481:web:41bc556c85d5ab0bb0c570",
  measurementId: "G-08MY14PK5G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

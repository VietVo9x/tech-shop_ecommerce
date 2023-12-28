// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyConGNojt5Dl3uaxhhC9LozaGgnscPfOm4',
  authDomain: 'react-ts-2c794.firebaseapp.com',
  projectId: 'react-ts-2c794',
  storageBucket: 'react-ts-2c794.appspot.com',
  messagingSenderId: '537773276676',
  appId: '1:537773276676:web:8375e20845baa0d47abf51',
  measurementId: 'G-34YK1G3KYG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Storage = getStorage(app);

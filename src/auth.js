// src/auth.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  onAuthStateChanged,
} from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBxfM4tdJSH9eMhdU_n4x4Kgr44fPWVnXg',
  authDomain: 'd2r-item-calc.firebaseapp.com',
  projectId: 'd2r-item-calc',
  storageBucket: 'd2r-item-calc.firebasestorage.app',
  messagingSenderId: '181383161855',
  appId: '1:181383161855:web:ef233477c25e0fcca6a9ca',
  measurementId: 'G-NZ5JSNEG7P',
};

// Initialize Firebase App (if it hasn't been initialized already)
const appFirebase = initializeApp(firebaseConfig);

// Get Firebase authentication instance
const auth = getAuth(appFirebase);

// Register a new user
export function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User registered:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error registering user:', error.message);
    });
}

// Login an existing user
export function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User logged in:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error logging in:', error.message);
    });
}

// Logout current user
export function logoutUser() {
  signOut(auth)
    .then(() => {
      console.log('User logged out');
    })
    .catch((error) => {
      console.error('Error logging out:', error.message);
    });
}

// Guest access (anonymous login)
export function useGuest() {
  signInAnonymously(auth)
    .then((userCredential) => {
      console.log('Guest user logged in:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error with guest login:', error.message);
    });
}

// Auth state listener
export function listenAuthState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is logged in:', user);
    } else {
      console.log('No user is logged in');
    }
  });
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  useGuest,
  listenAuthState,
};

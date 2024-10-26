// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCFLI-zWlZsqIxXImq892Ty3NO_y1zyWdU",
  authDomain: "linkquest-66cac.firebaseapp.com",
  projectId: "linkquest-66cac",
  storageBucket: "linkquest-66cac.appspot.com",
  messagingSenderId: "1086206763805",
  appId: "1:1086206763805:web:4b0666611bb01c8ddc37f4",
  measurementId: "G-G6NLTP1GRB",
  webClientId: "1086206763805-c702vpspr6g0hf38pn5bubkn79944q6p.apps.googleusercontent.com" // Your Web Client ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase modules
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export Firebase modules and Auth utilities
export { db, auth, storage, GoogleAuthProvider, signInWithCredential };
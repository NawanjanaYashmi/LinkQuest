
// import {getApp, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {getFirestore} from "firebase/firestore";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import * as firebaseAuth from 'firebase/auth';

// const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
// const initialize_App = (firebaseAuth as any).initializeAuth;      

// const firebaseConfig = {
 
// };


// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = initialize_App(app, {
//   persistence: reactNativePersistence(ReactNativeAsyncStorage)
// });

// export {db, auth };



import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCFLI-zWlZsqIxXImq892Ty3NO_y1zyWdU",
  authDomain: "linkquest-66cac.firebaseapp.com",
  projectId: "linkquest-66cac",
  storageBucket: "linkquest-66cac.appspot.com",
  messagingSenderId: "1086206763805",
  appId: "1:1086206763805:web:4b0666611bb01c8ddc37f4",
  measurementId: "G-G6NLTP1GRB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const storage = getStorage(app);

export { db, auth, storage };

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';



// const firebaseConfig = {
//     apiKey: "AIzaSyCFLI-zWlZsqIxXImq892Ty3NO_y1zyWdU",
//     authDomain: "linkquest-66cac.firebaseapp.com",
//     projectId: "linkquest-66cac",
//     storageBucket: "linkquest-66cac.appspot.com",
//     messagingSenderId: "1086206763805",
//     appId: "1:1086206763805:web:4b0666611bb01c8ddc37f4",
//     measurementId: "G-G6NLTP1GRB"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);


// export {app , db};
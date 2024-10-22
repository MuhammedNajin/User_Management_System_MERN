
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC88CyabM6qZaTJ7eODk_x9NjAaqDQ8-XI",
  authDomain: "user-maganament-system.firebaseapp.com",
  projectId: "user-maganament-system",
  storageBucket: "user-maganament-system.appspot.com",
  messagingSenderId: "549920419444",
  appId: "1:549920419444:web:d9f6343145bc3ff8886b21",
  measurementId: "G-YFGE1Q394W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
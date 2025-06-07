// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore}from "firebase/firestore";

import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVotTDLlpXSjDdgUjfl4tI2i2ycXpfxqM",
  authDomain: "react-projects-a996e.firebaseapp.com",
  projectId: "react-projects-a996e",
  storageBucket: "react-projects-a996e.appspot.com",
  messagingSenderId: "453511208859",
  appId: "1:453511208859:web:a2d7f1c8a3a162d0520b3e",
  measurementId: "G-V0S4YDMXSB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
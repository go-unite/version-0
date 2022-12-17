import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACsc90WpY0wIgJaHvxOSoY-PdXKAoNwgk",
  authDomain: "version-0-bd3fd.firebaseapp.com",
  projectId: "version-0-bd3fd",
  storageBucket: "version-0-bd3fd.appspot.com",
  messagingSenderId: "464491789591",
  appId: "1:464491789591:web:aa11a3b197c629c1b1cb52",
  measurementId: "G-PCWGVNB61L"
};

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp);
const analytics = getAnalytics(fbApp);

export {
  db,
  analytics
}
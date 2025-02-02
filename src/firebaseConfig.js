// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ_7rBzrzicz8G5i9O-6YLzlw_HZGqa0Q",
  authDomain: "bestpersians-5f9cf.firebaseapp.com",
  projectId: "bestpersians-5f9cf",
  storageBucket: "bestpersians-5f9cf.firebasestorage.app",
  messagingSenderId: "650489073625",
  appId: "1:650489073625:web:95044470d0ff08350e13c8",
  measurementId: "G-TG6VPK7L84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export the db object

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7ocKhaP05J871IbolDSO1e6PfzQvIbZw",
  authDomain: "cs-378-84f48.firebaseapp.com",
  databaseURL: "https://cs-378-84f48-default-rtdb.firebaseio.com",
  projectId: "cs-378-84f48",
  storageBucket: "cs-378-84f48.appspot.com",
  messagingSenderId: "679763081680",
  appId: "1:679763081680:web:330801838447d8fcd9e1d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
export const database = getDatabase(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();

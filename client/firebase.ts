// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpsHXZqNouVePQINIf3nB3cga7tRt4qg0",
  authDomain: "crypto-dashboar.firebaseapp.com",
  projectId: "crypto-dashboar",
  storageBucket: "crypto-dashboar.firebasestorage.app",
  messagingSenderId: "459887065892",
  appId: "1:459887065892:web:203270ce8af88ebd9891b1",
  measurementId: "G-YV8VL4PT8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
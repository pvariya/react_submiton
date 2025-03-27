import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   GoogleAuthProvider,
//   sendPasswordResetEmail,
//   signInWithPopup,
// } from "firebase/auth";
// import { signInWithEmailAndPassword } from "firebase/auth/cordova";

const firebaseConfig = {
  apiKey: "AIzaSyC9wEJv3gxAQlM7_ePCU8gRTAz9S-Isufg",
  authDomain: "fir-project-fd9fc.firebaseapp.com",
  projectId: "fir-project-fd9fc",
  storageBucket: "fir-project-fd9fc.firebasestorage.app",
  messagingSenderId: "585999060345",
  appId: "1:585999060345:web:9be3e1e59cf5556616b3a8",
  measurementId: "G-GG5HBS5RFD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

import firebaseInfo from "../firebase.json";

const NODE_ENV = process.env.NODE_ENV;
const IP_ADDRESS = "127.0.0.1"; //Had to set IP address to 127.0.0.1 instead of localhost because of DNS issues with firebase
const FIREBASE_AUTH_EMULATOR_HOST = `${IP_ADDRESS}:${firebaseInfo.emulators.auth.port}`;

const firebaseConfig = {
  apiKey: "AIzaSyC_LQGKZRLoWdGzyYae1MmyuokXd8djqmk",
  authDomain: "backpacking-b6486.firebaseapp.com",
  projectId: "backpacking-b6486",
  storageBucket: "backpacking-b6486.appspot.com",
  messagingSenderId: "835942085080",
  appId: "1:835942085080:web:ada768679df6ff61ddc2ad",
  measurementId: "G-0WLQB3GX4H",
};

const testFirebaseConfig = {
  apiKey: "fakekey",
  projectId: "backpacking-b6486",
};

// Initialize Firebase
const app = initializeApp(
  NODE_ENV === "test" ? testFirebaseConfig : firebaseConfig
);

const f_db = getFirestore(app);
const f_auth = getAuth(app);

if (NODE_ENV === "test") {
  connectFirestoreEmulator(
    f_db,
    IP_ADDRESS,
    firebaseInfo.emulators.firestore.port
  );
  connectAuthEmulator(f_auth, `http://${FIREBASE_AUTH_EMULATOR_HOST}`);
}

export const db = f_db;
export const auth = f_auth;
export const googleProvider = new GoogleAuthProvider();

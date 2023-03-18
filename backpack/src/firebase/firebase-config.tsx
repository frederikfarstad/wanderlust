import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

import firebaseInfo from "../../firebase.json";

const NODE_ENV = process.env.NODE_ENV;

const firebaseConfig = {
  apiKey: "AIzaSyC_LQGKZRLoWdGzyYae1MmyuokXd8djqmk",
  authDomain: "backpacking-b6486.firebaseapp.com",
  projectId: "backpacking-b6486",
  storageBucket: "backpacking-b6486.appspot.com",
  messagingSenderId: "835942085080",
  appId: "1:835942085080:web:ada768679df6ff61ddc2ad",
  measurementId: "G-0WLQB3GX4H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const emulatorInfo = firebaseInfo.emulators;

if (NODE_ENV === "test" || NODE_ENV === "development") {
  connectFirestoreEmulator(db, emulatorInfo.firestore.host, emulatorInfo.firestore.port);
  connectAuthEmulator(auth, `http://${emulatorInfo.auth.host}:${emulatorInfo.auth.port}`);
  connectStorageEmulator(storage, emulatorInfo.storage.host, emulatorInfo.storage.port);
}

export const googleProvider = new GoogleAuthProvider();
export { db, auth, storage };

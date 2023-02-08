import LoginPage from "./pages/LoginPage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
export const auth = getAuth(app);

function App() {
  return (
    <>
      <LoginPage />
    </>
  );
}

export default App;

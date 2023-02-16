import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { SubmitButton } from "./components/Buttons";
import { auth } from "./firebase";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoaded(true);
    });
  });
  if (!loaded)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  return <>{loggedIn ? <MainPage /> : <LoginPage />}</>;
}

export default App;

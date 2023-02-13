import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { SubmitButton } from "./components/Buttons";
import { auth } from "./firebase";
import LoginPage from "./pages/LoginPage";

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
  return (
    <>
      {loggedIn ? (
        <div title="MainAppContainer">
          <p>Welcome! {auth.currentUser!.uid}</p>
          <SubmitButton
            text="Log out"
            submitFunction={async () => {
              await signOut(auth);
              return true;
            }}
          />
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;

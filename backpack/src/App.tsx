import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth } from "./firebase/firebase-config";
import { loggedInRoutes, notLoggedInRoutes } from "./routes/routes";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoggedIn(user ? true : false);
    });
  });

  // This creates the routes based on login status.
  // For developers: if you don't want to log in, change to
  // ... !loggedIn ? ...
  const router = createBrowserRouter(
    loggedIn ? loggedInRoutes : notLoggedInRoutes
  );

  return <RouterProvider router={router} />;
};

export default App;

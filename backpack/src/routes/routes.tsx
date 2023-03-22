/*
 * Here we find two different routes.
 * One for logged in users, and one for those who don't
 * The reason for doing this is because the two routes are completely separate, and might
 * make it easier to understand.
 *
 * I have also put these in a separate file to make it easier to add more routes as we create them.
 *
 */

import ErrorPage from "../pages/ErrorPage";
import LoginForm from "../pages/LoginForm";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterForm from "../pages/RegisterForm";
import WelcomeUserPage from "../pages/WelcomeUserPage";
import Root from "../components/Root";
import ErrorPageNotLoggedIn from "../pages/ErrorPageNotLoggedIn";
import AccountRecoveryPage from "../pages/AccountRecovery";
import CreatePostForm2 from "../pages/CreateTripPage";
import TripPage from "../pages/TripPage";

export const loggedInRoutes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/register",
        element: <WelcomeUserPage />,
      },
      {
        path: "/profile/:urlID",
        element: <ProfilePage />,
      },
      {
        path: "/create",
        element: <CreatePostForm2 />,
      },
      {
        path: "/create/:tripId",
        element: <CreatePostForm2 />,
      },
      {
        path: "/trip/:tripId",
        element: <TripPage />
      }

    ],
  },
];

export const notLoggedInRoutes = [
  {
    errorElement: <ErrorPageNotLoggedIn />,
    children: [
      {
        path: "/",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/recovery",
        element: <AccountRecoveryPage />,
      },
    ],
  },
];

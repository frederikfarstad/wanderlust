/*
 * Here we find two different routes.
 * One for logged in users, and one for those who don't
 * The reason for doing this is because the two routes are completely separate, and might
 * make it easier to understand.
 *
 * I have also put these in a separate file to make it easier to add more routes as we create them.
 *
 */

import CreateRoutePage from "../pages/CreateRoutePage";
import ErrorPage from "../pages/ErrorPage";
import LoginForm from "../pages/LoginForm";
import MainPage from "../pages/MainPage";
import RegisterForm from "../pages/RegisterForm";
import WelcomeUserPage from "../pages/WelcomeUserPage";

export const loggedInRoutes = [
  {
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
        path: "/createroute",
        element: <CreateRoutePage />,
      },
    ],
  },
];

export const notLoggedInRoutes = [
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
    ],
  },
];


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
import MainPage from "../pages/MainPage";


export const loggedInRoutes = [
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />,
    },
]

export const notLoggedInRoutes = [
    {
        path: "/",
        element: <>Log in form here please</>,
        errorElement: <ErrorPage />
    }
]
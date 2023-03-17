import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { auth } from "../firebase/firebase-config";
import { loggedInRoutes, notLoggedInRoutes } from "../routes/routes";
import Footer from "./Footer";

function Root() {
  return (
    <div className="bg-primary-300 dark:bg-dark-300 min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;

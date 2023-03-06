import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { auth } from "../firebase/firebase-config";
import { loggedInRoutes, notLoggedInRoutes } from "../routes/routes";
import Footer from "./Footer";

function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;

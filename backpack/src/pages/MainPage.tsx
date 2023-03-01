import Post from "../components/Post";

import CreatePostForm from "../components/CreatePostForm";
import Footer from "../components/Footer";
import { collection, getDocs } from "@firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import useFirebaseCollection from "../hooks/useFirebaseData";
import { Timestamp } from "firebase/firestore";
import { Route } from "../utils/FirebaseUtils";

const tripRef = collection(db, "trips");



export default function MainPage() {
  const {
    data: trips,
    loading,
    error,
  } = useFirebaseCollection<Route>("Routes", false);

  const posts = trips?.map((trip) => <Post key={trip.title} {...trip} />);

  return (
    <div className="flex flex-col justify-between bg-primary-300">
      <div className="grid grid-cols-3">
        {/* Left side of page */}

        <div></div>

        {/* Middle of page */}
        <div className="h-max flex flex-col items-center gap-20 py-20">
          {posts}
        </div>

        {/* Right side of page */}
      </div>
    </div>
  );
}

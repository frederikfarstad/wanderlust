import Post from "../components/Post";

import CreatePostButton from "../components/CreatePostButton";
import CreatePostForm from "../components/CreatePostForm";
import Footer from "../components/Footer";
import { collection, getDocs } from "@firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import useFirebaseCollection from "../hooks/useFirebaseData";
import Navbar from "./Navbar";

const tripRef = collection(db, "trips");

interface Trip {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  rating: number;
  start: string;
  end: string;
}

export default function MainPage() {

  const { data: trips, loading, error } = useFirebaseCollection<Trip>("trips", true);


  const posts = trips?.map((trip) => <Post key={trip.id} {...trip} />);


  return (
    <div className="flex flex-col justify-between bg-primary-300">
      <Navbar />
      <div className="grid grid-cols-3">
        {/* Left side of page */}


        {/* Middle of page */}
        <div className="h-max flex flex-col items-center py-20">{posts}</div>

        {/* Right side of page */}
      </div>
      <Footer />
    </div>
  );
}

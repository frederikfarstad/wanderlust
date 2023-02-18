import Post from "../components/Post";

import CreatePostButton from "../components/CreatePostButton";
import Navbar from "../components/Navbar";
import CreatePostForm from "../components/CreatePostForm";
import Footer from "../components/Footer";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

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
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const getTripList = async () => {
      try {
        const data = await getDocs(tripRef);
        const filteredData: { [field: string]: any }[] = data.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );
        console.log(filteredData);
        setTrips(filteredData as Trip[]);
      } catch (error) {
        console.error("failed to get trips: ", error);
      }
    };
    getTripList();
  }, []);

  const posts = trips?.map((trip) => <Post key={trip.id} {...trip} />);

  return (
    <div className="flex flex-col justify-between bg-primary-300">
      <Navbar />
      <div className="grid grid-cols-3">
        {/* Left side of page */}
        <div>
          <div className="fixed top-20 left-5 group">
            <CreatePostButton />
            <div className="fixed top-40 left-5 scale-0 group-hover:scale-100 transition-all duration-700 origin-top-left">
              <CreatePostForm />
            </div>
          </div>
        </div>

        {/* Middle of page */}
        <div className="h-max flex flex-col items-center py-20">{posts}</div>

        {/* Right side of page */}
      </div>
      <Footer />
    </div>
  );
}

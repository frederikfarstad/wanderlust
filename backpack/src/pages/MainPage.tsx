import Post from "../components/Post";
import { useEffect, useState } from "react";
import { Trip } from "../components/createTrip/interface";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";
import { User } from "../firebase/UserUtils";

export default function MainPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const uid = auth.currentUser != null ? auth.currentUser.uid : "";

  useEffect(() => {
    getDoc(doc(db, "users", uid)).then((user) => {
      if (!user.exists()) return;

      const userData = user.data() as User;
      const getTrips = async () => {
        try {
          const userDataFavorites = userData.favorites || [];
          const tripsSnap = await getDocs(collection(db, "trips"));
          const data = tripsSnap.docs.map((doc, i) => {
            const isFavorited = userDataFavorites.indexOf(doc.id) != -1;

            return {
              ...doc.data(),
              favorited: isFavorited,
              id: doc.id,
            };
          }) as Trip[];
          setTrips(data);
        } catch (error) {
          console.error(error);
        }
      };
      getTrips();
    });
  }, []);

  const posts = trips.map((trip) => (
    <Post key={trip.title} {...trip} id={trip.id} />
  ));

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

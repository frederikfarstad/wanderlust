import Post from "../components/Post";
import { useEffect, useState } from "react";
import { Trip } from "../components/createTrip/interface";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export default function MainPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [sort, setSort] = useState("");
  
  useEffect(() => {
    const getTrips = async () => {
      try {
        const tripsSnap = await getDocs(collection(db, "trips"));
        const data = tripsSnap.docs.map((doc, i) => ({
          ...doc.data(),
          id: doc.id
        })) as Trip[];
        setTrips(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };
    getTrips();
  }, []);

  /*
  function handleSort(type: string) {

    if(type=="rating") {
      setSort("rating")
      //TODO: sort by rating
      
    } else if(type=="price") {
      setSort("price")
      trips.sort((a, b) => {
        return parseInt(a.price) - parseInt(b.price)
      })
    }
    console.log("here")
    return trips
  }

  const posts = handleSort(sort).map((trip) => (
    <Post key={trip.title} {...trip} id={trip.id} />
  ));
  */

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
          <div className="-translate-x-[14.6vw]">
            <div className="bg-primary-50 drop-shadow-md rounded-md text-center text-sm flex justify-between">
              <div className="relative inline-block dropdown">
                <button className="bg-primary-50 p-[16px] text-[16px] dropbtn rounded-md">Sort By {"->"}</button>
                <div className="hidden absolute top-1 bg-primary-100 min-w-[150px] z-[1] dropdown-content rounded-md duration-150 transition-all ease-in-out">
                    <a className="py-[12px] px-[16px] inline-block rounded-md" href="#" onClick={() => {handleSort("rating")}}>Rating</a>
                    <a className="py-[12px] px-[16px] inline-block rounded-md" href="#" onClick={() => {handleSort("price")}}>Price</a>
                </div>
              </div>
            </div>
          </div>
          {posts}
        </div>

        {/* Right side of page */}
      </div>
    </div>
  );
}

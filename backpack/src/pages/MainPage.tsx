import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Post from "../components/Trip";
import { getAllTrips } from "../firebase/asyncRequests";

export default function MainPage() {

  const [sort, setSort] = useState("");

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
  */

  const tripsQuery = useQuery({
    queryKey: ["trips"],
    queryFn: getAllTrips
  })

  if (tripsQuery.isLoading) return <>Loading trips...</>
  if (tripsQuery.isError) throw new Error("failed to load trips from homepage")

// challenge: display a post to be liked or not...
// one solution is to fetch the liked list on each post. should be fine, will only be fetched once


  const trips = tripsQuery.data.map((trip) => (
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
          {trips}
        </div>

        {/* Right side of page */}
      </div>
    </div>
  );
}

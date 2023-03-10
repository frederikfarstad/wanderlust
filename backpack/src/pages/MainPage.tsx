import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Post from "../components/Trip";
import { getAllTrips } from "../firebase/asyncRequests";

export default function MainPage() {

  const [sortedPosts, setPost] = useState<any>();

  const tripsQuery = useQuery({
    queryKey: ["trips"],
    queryFn: getAllTrips
  })

  //if (tripsQuery.isLoading) return <>Loading trips...</> FØRTE TIL AT DEN I FØRSTE RENDER RETURNA Loading Trips... OG IKKE KJØRTE RESTERENDE HOOKS. FIKK DERFOR FEIL I KONSOLLEN
  if (tripsQuery.isError) throw new Error("failed to load trips from homepage")

// challenge: display a post to be liked or not...
// one solution is to fetch the liked list on each post. should be fine, will only be fetched once

  const trips = tripsQuery.data?.map((trip) => (
    console.log(trip),
    {
      id: trip.id,
      title: trip.title,
      description: trip.description,
      price: trip.price,
      duration: trip.duration,
      //rating: trip.rating,
      locations: trip.locations,
      createdAt: trip.createdAt,
      createdBy: trip.createdBy,
      edited: trip.edited,
    }
  ));

  function handleSort(type: string) {
    if(type=="rating") {
      /*
      trips?.sort((a, b) => {
        return parseInt(a.rating) - parseInt(b.rating)
      })
      */
      
    } else if(type=="price") {
      trips?.sort((a, b) => {
        return parseInt(a.price) - parseInt(b.price)
      })
    } else if(type=="duration") {
      trips?.sort((a, b) => {
        return parseInt(a.duration) - parseInt(b.duration)
      })
    }
    const posts = trips?.map((trip) => (
      <Post key={trip.title} {...trip} id={trip.id} />
    ));
    setPost(posts);
  }

  useEffect(() => {
    handleSort("rating");
  }, [tripsQuery.data])
  
  return (
    <div className="flex flex-col justify-between bg-primary-300">
      <div className="grid grid-cols-3">
        {/* Left side of page */}

        <div></div>

        {/* Middle of page */}
        <div className="h-max flex flex-col items-center gap-20 py-20">
          <div className="bg-primary-50 drop-shadow-md rounded-md text-center text-sm flex justify-between">
            <div className="flex dropdown">
              <button className="bg-primary-200 p-[16px] text-[16px] rounded-md cursor-default">Sort By:</button>
              <div className="z-[1] dropdown-content rounded-md m-auto">
                  <a className="py-[12px] px-[16px] inline-block rounded-md" onClick={() => {handleSort("rating")}}>Rating</a>
                  <a className="py-[12px] px-[16px] inline-block rounded-md" onClick={() => {handleSort("price")}}>Price</a>
                  <a className="py-[12px] px-[16px] inline-block rounded-md" onClick={() => {handleSort("duration")}}>Duration</a>
              </div>
            </div>
          </div>
          {sortedPosts}
        </div>

        {/* Right side of page */}
      </div>
    </div>
  );
}

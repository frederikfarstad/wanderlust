import React, { useState } from "react";
import SmallTripView from "./SmallTripView";

export interface tripInterface {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  rating: number;
  start: string;
  end: string;
}

interface TripViewProps {
  myTrips: tripInterface[];
  favTrips: tripInterface[];
}

function TripView({ myTrips, favTrips }: TripViewProps) {
  const [ownTrips, setCheck] = useState(true);

  if (ownTrips) {
    /* Display own trips */
    return (
      <div className="font-mono font-bold min-h-[80vh] max-h-fit w-auto text-white border-l border-r mt-[10vh] mb-[10vh] pl-[2vh] pr-[2vh]">
        <button
          onClick={() => setCheck((prevCheck) => !prevCheck)}
          className="border-2 p-2 rounded-lg bg-primary-400 mb-3 hover:bg-primary-300 transition-all ease-out duration-300"
        >
          <p className="text-m">Bytt Til "Favoritter"</p>
        </button>

        <p className="text-3xl pb-[2vh]">Dine Turer:</p>
        {myTrips != undefined ? (
          myTrips?.map((trip) => (
            <SmallTripView
              key={trip.id}
              entry={{
                title: trip.title,
                description: trip.description,
                avgRating: trip.rating,
              }}
            />
          ))
        ) : (
          <p>Failed to load from trips</p>
        )}
      </div>
    );
  } else {
    /* Display favorite trips */
    return (
      <div className="font-mono font-bold min-h-[80vh] max-h-fit  w-auto text-white border-l border-r mt-[10vh] mb-[10vh] pl-[2vh] pr-[2vh]">
        <button
          onClick={() => setCheck((prevCheck) => !prevCheck)}
          className="border-2 p-2 rounded-lg bg-primary-400 mb-3 hover:bg-primary-300 transition-all ease-out duration-300"
        >
          <p className="text-m">Bytt Til "Dine Turer"</p>
        </button>

        <p className="text-3xl pb-[2vh] ">Dine Favoritter:</p>

        {favTrips != undefined ? (
          favTrips?.map((trip) => (
            <SmallTripView
              key={trip.id}
              entry={{
                title: trip.title,
                description: trip.description,
                avgRating: trip.rating,
              }}
            />
          ))
        ) : (
          <p>Failed to load from trips</p>
        )}
      </div>
    );
  }
}

export default TripView;

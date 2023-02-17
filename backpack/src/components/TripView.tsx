import React, { useState } from 'react';
import SmallTripView from './SmallTripView';

interface tripInterface {
  title: string;
  desc: string;
  img: string;
  rating: string;
}

interface TripViewProps {
  myTrips: tripInterface[];
  favTrips: tripInterface[];
}

function TripView({myTrips, favTrips}:TripViewProps) {

  const ownDummyTrips = [
    {
    title: "Domen",
    desc: "Domen gutt",
    img:"",
    rating:"4.26"
    },
    {
    title: "Gløs",
    desc: "Gløs gutt",
    img:"",
    rating:"5"
    },
    {
    title: "Dragvoll",
    desc: "Dragvoll gutt",
    img:"",
    rating:"1.27"
    },
    {
    title: "Handels",
    desc: "Handels gutt",
    img:"",
    rating:"3.75"
    }
  ]

  const favDummyTrips = [
      {
      title: "Samf",
      desc: "Samf gutt",
      img: "",
      rating:"4.99"
      }
  ]

  const [ownTrips, setCheck] = useState(true);
  
  if(ownTrips){
    /* Display own trips */
    return (
      <div className="font-mono font-bold min-h-[80vh] max-h-fit w-auto text-white border-l border-r mt-[10vh] mb-[10vh] pl-[2vh] pr-[2vh]">
        <button onClick={() => setCheck(prevCheck => !prevCheck)} className="border-2 p-2 rounded-lg bg-primary-400 mb-3 hover:bg-primary-300 transition-all ease-out duration-300">
          <p className="text-m">Bytt Til "Favoritter"</p>
        </button>

        <p className="text-3xl pb-[2vh]">Dine Turer:</p>
        {myTrips != undefined ? 
          myTrips?.map((trip) => (
            <SmallTripView {...[trip.title, trip.desc, trip.img, trip.rating]}/>
          )) : //Displays dummy data if no trips are passed TODO: remove this
          ownDummyTrips.map((trip) => (
            <SmallTripView {...[trip.title, trip.desc, trip.img, trip.rating]}/>
          ))
        }
      </div>
    )
  } else {
    /* Display favorite trips */
    return (
      <div className="font-mono font-bold min-h-[80vh] max-h-fit  w-auto text-white border-l border-r mt-[10vh] mb-[10vh] pl-[2vh] pr-[2vh]">
        <button onClick={() => setCheck(prevCheck => !prevCheck)} className="border-2 p-2 rounded-lg bg-primary-400 mb-3 hover:bg-primary-300 transition-all ease-out duration-300">
          <p className="text-m">Bytt Til "Dine Turer"</p>
        </button>
          
        <p className="text-3xl pb-[2vh] ">Dine Favoritter:</p>
    
        {favTrips != undefined ? 
          favTrips?.map((trip) => (
            <SmallTripView {...[trip.title, trip.desc, trip.img, trip.rating]}/>
          )) : //Displays dummy data if no trips are passed TODO: remove this
          favDummyTrips.map((trip) => (
            <SmallTripView {...[trip.title, trip.desc, trip.img, trip.rating]}/>
          ))
        }
      </div>
    )
  }
}
  
export default TripView
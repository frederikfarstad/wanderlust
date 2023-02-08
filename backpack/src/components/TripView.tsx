import React, { useState } from 'react';
import SmallTripView from './SmallTripView';

function TripView() {

  const [ownTrips, setCheck] = useState(true);
  
  if(ownTrips){
    /* Display own trips */
    return (
      <div className="font-mono font-bold min-h-[80vh] max-h-fit w-auto text-white border-l border-r mt-[10vh] mb-[10vh] pl-[2vh] pr-[2vh]">
        <button onClick={() => setCheck(prevCheck => !prevCheck)}>
          <p className="text-m">Bytt Til "Favoritter"</p>
        </button>

        <p className="text-3xl pb-[2vh]">Dine Turer:</p>

        <SmallTripView />
        <SmallTripView />
        <SmallTripView />
        <SmallTripView />
      </div>
    )
  } else {
    /* Display favorite trips */
    return (
      <div className="font-mono font-bold min-h-[80vh] max-h-fit  w-auto text-white border-l border-r mt-[10vh] mb-[10vh] pl-[2vh] pr-[2vh]">
        <button onClick={() => setCheck(prevCheck => !prevCheck)}>
          <p className="text-m">Bytt Til "Dine Turer"</p>
        </button>
          
        <p className="text-3xl pb-[2vh] ">Dine Favoritter:</p>

        <SmallTripView />
      </div>
    )
  }
  
  
  
}
  
export default TripView
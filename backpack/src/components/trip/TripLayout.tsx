import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getTripById } from "../../firebase/asyncRequests";
import { getUid } from "../../utils/FirebaseUtils";
import TripBody from "./TripBody";
import TripFooter from "./TripFooter";
import TripHeader from "./TripHeader";

/* Since the trip component became very complicated, I split it into multiple parts: header, body and footer. Each part takes care of different logic and displays different info.
   Makes it a lot easier to test/update/read


   trip header takes care of creator/ownership stuff
   body takes care of displaying basic info
   footer takes care of comments/favorite/rating status
*/


export default function TripLayout({tripId} : {tripId: string}) {

  const [editmode, setEditmode] = useState(false);

  const tripQuery = useQuery({
    queryKey: ["trips", tripId],
    queryFn: () => getTripById(tripId),
  });

  if (!tripQuery.isSuccess) return <div>Loading trip...</div>;

  /*  TODO : fix edit mode */
  if (editmode) return (<div>Editmode with details, only the things that can change, title,locations, price, duration, desc. The rest will remain unchanged</div>);

  return (
    <div className="border border-white rounded-t-xl p-4 bg-primary-100">
      <TripHeader tripId={tripId} {...tripQuery.data} />
      <TripBody {...tripQuery.data} />
      <TripFooter tripId={tripId} {...tripQuery.data} />
    </div>
  );
}

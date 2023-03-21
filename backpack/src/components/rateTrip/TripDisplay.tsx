import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getTripById, getUserById } from "../../firebase/asyncRequests";
import { getUid } from "../../utils/FirebaseUtils";
import { IconEdit, IconDelete } from "../createTrip/Icons";
import { ListElement } from "../trip/LocationListElement";
import TripFooter from "../trip/TripFooter";

/* 
Goal: this should handle layout only. Logic should be moved to separate components.

Header and footer?

Header needs to fetch creator info (can aslo handle delete/edit)

Footer handles info about comments/likes/etc


DELETE THIS?

TODO : delet dis


*/



export default function TripDisplay() {
  const { tripId } = useParams();
  if (!tripId) throw new Error("navigated to invalid trip");
  const uid = getUid();

  const tripQuery = useQuery({
    queryKey: ["trips", tripId],
    queryFn: () => getTripById(tripId),
  });

  // TODO : fix this very cheeky hack. Here we send in uid when we don't know yet who made it
  const creatorQuery = useQuery({
    queryKey: ["users", tripQuery.data?.createdBy],
    queryFn: () => getUserById(tripQuery.data?.createdBy || uid),
    enabled: !!tripQuery.data?.createdBy,
  });

  if (!tripQuery.isSuccess || !creatorQuery.isSuccess)
    return <div>Loading ...</div>;

  const { username, profilepicture } = creatorQuery.data;
  const { title, price, duration, description, createdAt, edited, locations } =
    tripQuery.data;

  const locationElements = locations.map((l, i) => (
    <ListElement key={i} {...l} />
  ));

  return (<div className="border-white border rounded-t-xl">

    <div className="p-4 relative group">
      <div className="flex flex-row items-center gap-4">
        <img src={profilepicture} className="w-12 h-12 rounded-full" />
        <div className="flex flex-col">
          <div className="font-semibold">{username}</div>
          <div className="flex flex-row items-center">
            <div className="font-light text-xs">
              {moment(createdAt.toDate()).fromNow()}
            </div>

            {edited !== undefined && (
              <>
                <div className="font-light text-xs mx-2">-</div>
                <div className="font-light text-xs">
                  edited {moment(edited.toDate()).fromNow()}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center font-bold text-3xl">
        {title}
      </div>
      <div className="flex justify-between">
        <ol className="relative border-l border-gray-700">
          {locationElements}
        </ol>
        <div className="flex flex-col">
          <div>Price: {price}</div>
          <div>Duration: {duration}</div>
        </div>
      </div>
      {description}

            



      <div className="absolute right-4 top-4 scale-0 group-hover:scale-100 flex flex-row gap-2">
        <button
        /*         onClick={() => setEditing(true)} */
        >
          <IconEdit />
        </button>
        <button
        /*           onClick={() => deleteRatingMutation.mutate({ uid, tripId, ratingId })} */
        >
          <IconDelete />
        </button>
      </div>
    </div>
    <TripFooter tripId={""} numberOfRatings={0} averageRating={0} numberOfFavorites={0} />
        </div>
  );
}


import { useQuery } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { Link } from "react-router-dom";
import { getUserById } from "../../firebase/asyncRequests";
import { getUid } from "../../utils/FirebaseUtils";
import { IconDelete, IconEdit } from "../createTrip/Icons";

interface TripHeaderProps {
  tripId: string;
  createdBy: string;
  createdAt: Timestamp;
  edited: Timestamp;
  // TODO : enter edit mode for later
}

export default function TripHeader({
  tripId,
  createdBy,
  createdAt,
  edited,
}: TripHeaderProps) {
  const uid = getUid();
  const creatorQuery = useQuery({
    queryKey: ["users", createdBy],
    queryFn: () => getUserById(createdBy),
  });

  if (!creatorQuery.isSuccess) return <div>Loading user...</div>;

  const owner = uid === createdBy;
  const { username, profilepicture } = creatorQuery.data;

  /* TODO : implement */
  const handleDelete = () => {
    /* 
    1. delete all ratings of trip
    2. remove all entries in favorite, ratings
    3. remove the trip
    4. make sure the page is switched to mainpage, if on tripPage
    Probably need a bunch of mutations for this, we'll see
    */
  };


  return (
    <div className="flex flex-row items-center gap-4 relative">
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
      {owner && (
        <div className="absolute right-4 top-4 flex flex-row gap-2">
          <Link to={"/create/" + tripId}>
            <button>
              <IconEdit />
            </button>
          </Link>
          <button onClick={handleDelete}>
            <IconDelete />
          </button>
        </div>
      )}
    </div>
  );
}

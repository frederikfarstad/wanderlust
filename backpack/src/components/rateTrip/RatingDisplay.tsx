import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { deleteRating, getUserById } from "../../firebase/asyncRequests";
import { RatingInterface } from "../../firebase/Interfaces";
import { getUid } from "../../utils/FirebaseUtils";
import { IconDelete, IconEdit } from "../createTrip/Icons";
import CreateRating, { IconStar } from "./CreateRating";

export default function RatingDisplay({
  id,
  createdBy,
  createdAt,
  text,
  rating,
}: RatingInterface) {
  const uid = getUid();
  const { tripId } = useParams();
  if (!tripId) throw new Error("navigated to invalid trip");

  const [editing, setEditing] = useState(false);

  const creatorQuery = useQuery({
    queryKey: ["users", createdBy],
    queryFn: () => getUserById(createdBy),
  });

  const queryClient = useQueryClient();
  const deleteRatingMutation = useMutation(deleteRating, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users", uid]);
      queryClient.invalidateQueries(["trips", tripId]);
    },
  });

  if (!creatorQuery.isSuccess) return <div>Loading...</div>;

  const { username, profilepicture } = creatorQuery.data;


  if (editing) {
    return <CreateRating id={id} text={text} rating={rating} handleCreate={() => setEditing(false)} />
  }

  return (
    <div className="border border-black relative group">
      <div className="flex justify-between items-center  p-2">
        <div className="flex flex-row items-center">
          <img src={profilepicture} className="w-8 h-8 rounded-full" />
          <div className="flex flex-col px-2">
            <div className="font-semibold">{username}</div>
            <div className="font-light text-xs">
              {moment(createdAt.toDate()).fromNow()}
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <IconStar size={"1.5em"} yellow={true} />
          <IconStar size={"1.5em"} yellow={1 < rating} />
          <IconStar size={"1.5em"} yellow={2 < rating} />
          <IconStar size={"1.5em"} yellow={3 < rating} />
          <IconStar size={"1.5em"} yellow={4 < rating} />
        </div>
      </div>
      <div className="h-px border border-black"></div>
      <div className="p-2">{text}</div>
      <div className="absolute right-2 bottom-2 scale-0 group-hover:scale-100 flex flex-row gap-2">
        <button onClick={() => setEditing(true)}>
          <IconEdit />
        </button>
        <button onClick={() => deleteRatingMutation.mutate({uid, tripId, ratingId: id})}>
          <IconDelete />
        </button>
      </div>
    </div>
  );
}

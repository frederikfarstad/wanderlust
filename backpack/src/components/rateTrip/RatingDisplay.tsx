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
  ratingId,
  createdBy,
  createdAt,
  text,
  rating,
  edited,
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
      queryClient.invalidateQueries(["ratings", tripId]);
    },
  });

  if (!creatorQuery.isSuccess) return <div>Loading...</div>;

  const { username, profilepicture } = creatorQuery.data;

  if (editing) {
    return (
      <CreateRating
        ratingId={ratingId}
        text={text}
        rating={rating}
        handleCreate={() => setEditing(false)}
      />
    );
  }

  return (
    <div className="relative group border-x border-t last:border-b p-4">
      <div className="flex flex-row items-center gap-4">
        <img src={profilepicture} className="w-12 h-12 rounded-full" />
        <div className="flex flex-col">
          <div className="font-semibold">{username}</div>
          <div className="flex flex-row items-center">
            <div className="font-light text-xs">
              {moment(createdAt.toDate()).fromNow()}
            </div>

            {edited !== undefined && (
              <div className="font-light text-xs mx-4">-</div>
            )}
            {edited !== undefined && (
              <div className="font-light text-xs">
                edited {moment(edited.toDate()).fromNow()}
              </div>
            )}
          </div>
          <div className="flex flex-row mt-2">
            <IconStar size={"1.1em"} yellow={true} />
            <IconStar size={"1em"} yellow={1 < rating} />
            <IconStar size={"1em"} yellow={2 < rating} />
            <IconStar size={"1em"} yellow={3 < rating} />
            <IconStar size={"1em"} yellow={4 < rating} />
          </div>
        </div>
      </div>
      <div className="p-2">{text}</div>

      <div className="absolute right-2 bottom-2 scale-0 group-hover:scale-100 flex flex-row gap-2">
        <button onClick={() => setEditing(true)}>
          <IconEdit />
        </button>
        <button
          onClick={() => deleteRatingMutation.mutate({ uid, tripId, ratingId })}
        >
          <IconDelete />
        </button>
      </div>
    </div>
  );
}

/* 
We have two cases: 
- prop id is undefined, meaning current user is creating a new rating
- prop id is defined, meaning current user is editing existing rating


needs an on success function to leave editmode, if in it?

Could be a setstate function for edit, and for the standard one, we pass in an empty function
() => {}

*/

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  createRating,
  getUserById,
  updateRating,
} from "../../firebase/asyncRequests";
import { getUid } from "../../utils/FirebaseUtils";

export default function CreateRating({
  id,
  text,
  rating,
  handleCreate,
}: {
  id?: string;
  text?: string;
  rating?: number;
  handleCreate: () => void
}) {
  const uid = getUid();
  const { tripId } = useParams();
  if (!tripId) throw new Error("navigated to invalid trip");
  const editMode = id !== undefined;

  const [ratingText, setRatingText] = useState(text || "");
  const [ratingNumber, setRatingNumber] = useState(rating || 1);

  const currentUserQuery = useQuery({
    queryKey: ["users", uid],
    queryFn: () => getUserById(uid),
  });

  const queryClient = useQueryClient();
  const postRatingMutation = useMutation(
    editMode ? updateRating : createRating,
    {
      onSuccess: (id) => {
        queryClient.invalidateQueries(["trips", tripId]);
        queryClient.invalidateQueries(["users", uid]);
        setRatingNumber(1)
        setRatingText("")
        console.log("we did something here")
        handleCreate()
      },
    }
  );

  const username = currentUserQuery?.data?.username || "loading user...";

  return (
      <div className="border border-white p-4 grid grid-cols-4 gap-4">
        <div className="col-span-4">Review as {username}</div>
        <textarea
          rows={4}
          className="col-span-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-10"
          placeholder="what are your thoughts"
          value={ratingText}
          onChange={(e) => setRatingText(e.target.value)}
        ></textarea>
        <div className="flex items-center col-span-2">
          <input
            id="minmax-range"
            type="range"
            min="1"
            max="5"
            onChange={(e) => setRatingNumber(parseInt(e.target.value))}
            value={ratingNumber}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
          ></input>
        </div>
        <div className="flex items-center gap-2">
          <IconStar size={"3em"} yellow={true} />
          <IconStar size={"3em"} yellow={1 < ratingNumber} />
          <IconStar size={"3em"} yellow={2 < ratingNumber} />
          <IconStar size={"3em"} yellow={3 < ratingNumber} />
          <IconStar size={"3em"} yellow={4 < ratingNumber} />
        </div>
        <button
          onClick={() =>
            postRatingMutation.mutate({
              createdBy: uid,
              tripId,
              text: ratingText,
              rating: ratingNumber,
              ratingId: id
            })
          }
          disabled={ratingText === "" || postRatingMutation.isLoading}
          className="col-start-1 text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 disabled:hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {postRatingMutation.isSuccess ? "Post rating" : "Success!"}
        </button>
      </div>
  );
}

export function IconStar({ yellow, size }: { yellow: boolean; size: string }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height={size}
      width={size}
      className={yellow ? "text-yellow-500" : "text-black"}
    >
      <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
    </svg>
  );
}

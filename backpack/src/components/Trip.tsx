import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { Link } from "react-router-dom";
import { deleteTrip, getUserById, toggleFavourited, toggleLiked } from "../firebase/asyncRequests";
import { Location, Trip } from "../firebase/Interfaces";
import { getUid } from "../utils/FirebaseUtils";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useState } from "react";

/**
 * THE GOAL:
 * For each post we need to fetch two things from the database (with userQuery):
 *  - the user that created the post
 *  - the current user
 * With this information, we can determine if the post was made by the current user, and give added functionality.
 *
 * NOTE: because of React Query caching, we will not have two reads from firebase for each post. One read for current user accross all trips, and one read for each new creator
 * This will save us a lot of reads compared to the old method
 *
 * For each post we need to give the ability to write to the database (with useMutation):
 *  - delete post
 *        Completed, will also invalidate cache, forcing refreshing of data. This means that the post will actually disapear when deleted.
 *  - like/unlike
 *        Not completed. The lists of liked/favorited trips are updated properly, but the ui is not.
 *        This could be solved with state. However it is more "safe" to display based on data from database. This will avoid data missmatch.
 *        To solve this, fix issues in handleToggleFavorite. Update the toggleFavoriteMutation to invalidate the correct data.
 *
 *
 *  */

export default function TripDisplay({
  id,
  title,
  description,
  duration,
  price,
  locations,
  createdAt,
  createdBy,
  edited,
}: Trip) {
  const uid = getUid();

  const [creatorQuery, userQuery] = useQueries({
    queries: [
      {
        queryKey: ["users", createdBy],
        queryFn: () => getUserById(createdBy),
      },
      {
        queryKey: ["users", uid],
        queryFn: () => getUserById(uid),
      },
    ],
  });

  const queryClient = useQueryClient();
  const deleteTripMutation = useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => queryClient.invalidateQueries(["trips"]),
  });
  const toggleLikedMutation = useMutation({
    mutationFn: toggleLiked,
    onSuccess: () => queryClient.invalidateQueries(["trips"]),
  });
  const toggleFavoritedMutation = useMutation({
    mutationFn: toggleFavourited,
    onSuccess: () => queryClient.invalidateQueries(["trips"]),
  });

  // Current user may have a list of favorited and liked trips. We store them here, if they exist.
  // Some users do not have favorited/liked trips yet. In that case we store an empty array
  const [likedArray, setLikedArray] = useState(userQuery.data ? userQuery.data.liked || [] : []);
  const [favoritedArray, setFavoritedArray] = useState(userQuery.data ? userQuery.data.favorited || [] : []);

  if (userQuery.isLoading || creatorQuery.isLoading) return <>Loading trip...</>;
  if (userQuery.isError || creatorQuery.isError) return <>{JSON.stringify(userQuery.error)}</>;

  // to check if the current user has liked/favorited the trip, we check if the post exist in the likedArray or favoritedArray
  const isLiked = likedArray.includes(id);
  const isFavorited = favoritedArray.includes(id);

  // get info about the creator, to display on the post
  const { profilepicture, username } = creatorQuery.data;

  // When the favourite button is pressed: update the array to either remove the id (of this trip) or add it to the list. After that we send it to the database
  const handleToggleFavorite = () => {
    const favorited = favoritedArray.includes(id) ? favoritedArray.filter((f) => f !== id) : [...favoritedArray, id];
    toggleFavoritedMutation.mutate({ uid, favorited });
    setFavoritedArray(favorited);
  };
  const handleToggleLiked = () => {
    const liked = likedArray.includes(id) ? likedArray.filter((l) => l !== id) : [...likedArray, id];
    toggleLikedMutation.mutate({ uid, liked });
    setLikedArray(liked);
  };

  const owner = createdBy === uid;
  const stopElements = locations.map((s, i) => <ListElement key={i} {...s} />);

  return (
    <div
      className="bg-blue-100 rounded-xl p-4 w-full relative group"
      title="TripDiv"
      data-createdAt={createdAt.seconds}
    >
      {owner && (
        <div className="flex flex-col gap-2 absolute top-4 right-4 opacity-0 group-hover:opacity-100">
          <button onClick={() => deleteTripMutation.mutate(id)} className="text-sm font-light text-gray-500">
            Delete
          </button>
          <Link to={"/create/" + id}>
            <button className="text-sm font-light text-gray-500">Edit</button>
          </Link>
        </div>
      )}
      <Link to={"/profile/" + createdBy}>
        <div className="flex flex-wrap items-center">
          <img src={profilepicture} className="h-8 w-8 bg-blue-600 rounded-full" />
          <div className="px-2">
            <div className="self-center text-sm font-semibold">{username}</div>
            <div className="text-xs text-gray-800 flex items-center">{moment(createdAt?.toDate()).fromNow()}</div>
          </div>
        </div>
      </Link>
      <div className="text-center text-xl font-semibold mt-4" title="TripPostTitle">
        {title}
      </div>
      <div className="py-2 px-4">
        <ol className="relative border-l border-gray-700">{stopElements}</ol>
      </div>
      {description}
      <div className="bg-gray-600 h-px"></div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className="flex gap-1">
            Price: <p title="PostPriceInfoContainer">{price}</p> €
          </div>
          <div className="flex gap-1">
            Duration: <p title="PostDurationInfoContainer">{duration}</p> days
          </div>
        </div>
        <div className="flex flex-row">
          <button onClick={handleToggleFavorite} title="FavoriteTripButton">
            {isFavorited ? (
              <div title="FavoritedIcon">
                <AiFillStar color="orange" />
              </div>
            ) : (
              <div title="NonFavoritedIcon">
                <AiOutlineStar />
              </div>
            )}
          </button>
          <IconLike liked={isLiked} />
        </div>
      </div>
      {edited ? (
        <div className="text-xs text-gray-800 flex items-center">edited: {moment(edited.toDate()).fromNow()}</div>
      ) : (
        <></>
      )}
    </div>
  );
}

export function ListElement({ country, province, area }: Location) {
  return (
    <li className="mb-6 ml-4">
      <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -left-1.5 border border-white"></div>
      <h3 className=" text-xs font-semibold text-gray-900">{country}</h3>
      <p className="mb-4 text-xs  font-normal text-gray-500">
        {province}, {area}
      </p>
    </li>
  );
}

function IconLike(liked: { liked: boolean }) {
  const name = liked.liked ? "text-red-500" : "text-gray-500";
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em" className={name}>
      <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z" />
    </svg>
  );
}

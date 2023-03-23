import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUserById, toggleFavorite } from "../../firebase/asyncRequests";
import { getUid } from "../../utils/FirebaseUtils";
import { IconStar } from "../rateTrip/CreateRating";

interface TripFooterProps {
  tripId: string;
  numberOfFavorites?: number;
  numberOfRatings?: number;
  averageRating?: number;
}

export default function TripFooter({
  tripId,
  numberOfRatings = 0,
  averageRating = 0,
  numberOfFavorites = 0,
}: TripFooterProps) {
  const uid = getUid();

  const creatorQuery = useQuery({
    queryKey: ["users", uid],
    queryFn: () => getUserById(uid),
  });

  const isFavorited = creatorQuery.isSuccess ? creatorQuery.data.favorited?.includes(tripId) || false : false;

  const queryClient = useQueryClient();
  const favoriteMutation = useMutation(toggleFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries(["trips", tripId]);
      queryClient.invalidateQueries(["users", uid]);
    },
  });

  return (
    <div className="flex flex-row items-center justify-center gap-20 dark:text-dark-900">
      <div className="flex flex-row items-center gap-2">
        <Link to={"/trip/" + tripId}>
          <button className="w-8 h-8 rounded-full bg-opacity-0 flex items-center justify-center">
            <IconComment />
          </button>
        </Link>
        <div className="">{numberOfRatings}</div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <button
          disabled={favoriteMutation.isLoading}
          onClick={() => favoriteMutation.mutate({ uid, tripId, isFavorited })}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          title="FavoriteTripButton"
        >
          {isFavorited ? <IconFullHeart /> : <IconEmptyHeart />}
        </button>
        <div className="group-hover:text-sky-700">{numberOfFavorites}</div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <IconStar yellow={true} size={"1em"} />
        <div>{Math.round((averageRating + Number.EPSILON) * 100) / 100}</div>
      </div>
    </div>
  );
}

function IconComment() {
  return (
    <div title="NonFavoritedIcon">
      <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
        <path d="M256 32C114.6 32 .027 125.1.027 240c0 47.63 19.91 91.25 52.91 126.2-14.88 39.5-45.87 72.88-46.37 73.25-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25 28 9.05 60.2 14.25 92.9 14.25 141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zm.1 368c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29 7.375-12.12 14.37-25.75 19.88-40.25l10.62-28-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z" />
      </svg>
    </div>
  );
}

function IconEmptyHeart() {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">
      <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" />
    </svg>
  );
}

function IconFullHeart() {
  return (
    <div title="FavoritedIcon">
      <svg className="text-red-500" viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">
        <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
      </svg>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getRatingsByTripId } from "../../firebase/asyncRequests";
import { RatingInterface } from "../../firebase/Interfaces";
import RatingDisplay from "./RatingDisplay";

export default function RatingSection() {
  const { tripId } = useParams();
  if (!tripId) throw new Error("tried navigating to invalid trip");

  const [direction, setDirection] = useState(1);
  const [sortingIndex, setSortingIndex] = useState(0);
  const sortingOptions = [
    (a: RatingInterface, b: RatingInterface) => direction * (b.createdAt.toMillis() - a.createdAt.toMillis()),
    (a: RatingInterface, b: RatingInterface) => direction * (a.rating - b.rating),
  ];

  const ratingQuery = useQuery({
    queryKey: ["ratings", tripId],
    queryFn: () => getRatingsByTripId(tripId),
  });

  if (!ratingQuery.isSuccess) return <div>Loading ratings...</div>;

  const unsortedRatings = ratingQuery.data;
  const sortedRatings = unsortedRatings.sort(sortingOptions[sortingIndex]);
  const ratingElements = sortedRatings.map((r, i) => (
    <RatingDisplay key={r.ratingId} {...r} />
  ));

  return (
    <div className="flex flex-col border-x border-white rounded-b-xl">
      <div className="border-t border-white p-2 flex flex-row items-center gap-4">
        <div className="font-semibold">Sort by</div>
        <button onClick={() => setSortingIndex(0)} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
          Age
        </button>
        <button onClick={() => setSortingIndex(1)} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
          Rating
        </button>
        <button
          className={`transform ${
            direction === -1 ? "rotate-180" : ""
          } transition-all duration-300`}
          onClick={() => setDirection(-1 * direction)}
        >
          <IconArrowDownCircle />
        </button>
      </div>
      {ratingElements}
    </div>
  );
}

function IconArrowDownCircle() {
  return (
    <svg
      className=""
      fill="currentColor"
      viewBox="0 0 16 16"
      height="2em"
      width="2em"
    >
      <path
        fillRule="evenodd"
        d="M1 8a7 7 0 1014 0A7 7 0 001 8zm15 0A8 8 0 110 8a8 8 0 0116 0zM8.5 4.5a.5.5 0 00-1 0v5.793L5.354 8.146a.5.5 0 10-.708.708l3 3a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 10.293V4.5z"
      />
    </svg>
  );
}

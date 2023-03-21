import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Post from "../components/trip/TripLayout";
import {
  getAllFavoritedTripsFromUserId,
  getAllTrips,
} from "../firebase/asyncRequests";
import { Trip } from "../firebase/Interfaces";
import { KeywordMapping } from "../types";
import { getUid } from "../utils/FirebaseUtils";
import { getKeywordsFromTrips, getRelevanceScore } from "../utils/SortingUtils";

type SortFunction = (a: Trip, b: Trip) => number;
type SelectSortFuncButtonProps = {
  text: string;
  onChangeSortFunc: (newSortFuncIndex: number) => void;
  direction: number;
  currentSortFuncIndex: number;
  attachedSortFuncIndex: number;
};

export default function MainPage() {
  const uid = getUid();
  const [direction, setDirection] = useState<number>(1);
  const [relevanceKeywords, setRelevanceKeywords] = useState<KeywordMapping>(
    new Map<string, number>()
  );

  const updateRelevanceKeywords = async () => {
    const keywords = getKeywordsFromTrips(
      await getAllFavoritedTripsFromUserId(uid)
    );
    setRelevanceKeywords(keywords);
  };

  const sortByRelevance = (a: Trip, b: Trip) =>
    direction * getRelevanceScore(relevanceKeywords, b) -
    getRelevanceScore(relevanceKeywords, a);
  const sortByNew = (a: Trip, b: Trip) =>
    direction * (b.createdAt.toMillis() - a.createdAt.toMillis());
  const sortByPrice = (a: Trip, b: Trip) =>
    direction * (parseInt(a.price) - parseInt(b.price));
  const sortByDuration = (a: Trip, b: Trip) =>
    direction * (parseInt(a.duration) - parseInt(b.duration));

  const sortFunctionList = [
    sortByRelevance,
    sortByNew,
    sortByPrice,
    sortByDuration,
  ];

  const [sortFuncIndex, setSortFuncIndex] = useState<number>(0);
  const sortFunc = sortFunctionList[sortFuncIndex];

  const onChangeSortFunc = (newSortFuncIndex: number) => {
    if (sortFuncIndex === newSortFuncIndex) return setDirection(-direction);
    setDirection(1);
    setSortFuncIndex(newSortFuncIndex);
  };

  const tripsQuery = useQuery({
    queryKey: ["trips"],
    queryFn: getAllTrips,
  });

  if (tripsQuery.isError) throw new Error("failed to load trips from homepage");

  const unsortedTrips = tripsQuery.isSuccess ? tripsQuery.data : [];
  const sortedTrips = unsortedTrips.sort(sortFunc);
  const posts = sortedTrips.map((trip) => (
    <Post key={trip.id} tripId={trip.id} />
  ));

  useEffect(() => {
    updateRelevanceKeywords();
  }, []);

  return (
    <div className="flex flex-col justify-between">
      <div className="grid grid-cols-6">
        {/* Left side of page */}

        <div></div>

        {/* Middle of page */}
        <div className="h-max col-start-2 col-span-4 flex flex-col items-center gap-20 py-20 dark:text-white">
          <div className="bg-primary-100 dark:bg-dark-100 drop-shadow-md rounded-md text-center text-sm flex overflow-clip">
            <p className="bg-primary-200 dark:bg-dark-50 p-4 cursor-default rounded-l-md whitespace-nowrap">
              Sort by:
            </p>
            <div className="z-[1] flex-1 whitespace-nowrap">
              <SelectSortFuncButton
                text="Relevance"
                attachedSortFuncIndex={0}
                onChangeSortFunc={onChangeSortFunc}
                direction={direction}
                currentSortFuncIndex={sortFuncIndex}
              />
              <SelectSortFuncButton
                text="New"
                attachedSortFuncIndex={1}
                onChangeSortFunc={onChangeSortFunc}
                direction={direction}
                currentSortFuncIndex={sortFuncIndex}
              />
              <SelectSortFuncButton
                text="Price"
                attachedSortFuncIndex={2}
                onChangeSortFunc={onChangeSortFunc}
                direction={direction}
                currentSortFuncIndex={sortFuncIndex}
              />
              <SelectSortFuncButton
                text="Duration"
                attachedSortFuncIndex={3}
                onChangeSortFunc={onChangeSortFunc}
                direction={direction}
                currentSortFuncIndex={sortFuncIndex}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-20">

          {posts}
          </div>
        </div>

        {/* Right side of page */}
      </div>
    </div>
  );
}

const SelectSortFuncButton = (props: SelectSortFuncButtonProps) => {
  const {
    text,
    onChangeSortFunc,
    currentSortFuncIndex,
    attachedSortFuncIndex,
    direction,
  } = props;
  const directionIndication = direction === 1 ? "v" : "^";
  const isSelected = currentSortFuncIndex === attachedSortFuncIndex;

  return (
    <button
      onClick={() => onChangeSortFunc(attachedSortFuncIndex)}
      className={`h-full w-1/4 px-8 ${
        isSelected ? "bg-primary-50 dark:bg-dark-200 shadow-inner" : ""
      }`}
      data-testid={`SortingButton-${text}`}
    >
      <div className="flex items-center justify-center">
        <p>
          {text} {isSelected ? directionIndication : ""}
        </p>
      </div>
    </button>
  );
};

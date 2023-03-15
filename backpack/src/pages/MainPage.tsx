import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Post from "../components/Trip";
import { getAllTrips } from "../firebase/asyncRequests";
import { Trip } from "../firebase/Interfaces";

type SortFunction = (a: Trip, b: Trip) => number;
type SelectSortFuncButtonProps = {
  text: string;
  onChangeSortFunc: (newSortFuncIndex: number) => void;
  direction: number;
  currentSortFuncIndex: number;
  attachedSortFuncIndex: number;
};

export default function MainPage() {
  const [direction, setDirection] = useState<number>(1);

  const sortByNew = (a: Trip, b: Trip) => direction * (b.createdAt.toMillis() - a.createdAt.toMillis());
  const sortByPrice = (a: Trip, b: Trip) => direction * (parseInt(a.price) - parseInt(b.price));
  const sortByDuration = (a: Trip, b: Trip) => direction * (parseInt(a.duration) - parseInt(b.duration));

  const sortFunctionList = [sortByNew, sortByPrice, sortByDuration];

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
  const posts = sortedTrips.map((trip) => <Post {...trip} key={trip.id} id={trip.id} />);

  return (
    <div className="flex flex-col justify-between bg-primary-300">
      <div className="grid grid-cols-3">
        {/* Left side of page */}

        <div></div>

        {/* Middle of page */}
        <div className="h-max flex flex-col items-center gap-20 py-20">
          <div className="bg-primary-100 drop-shadow-md rounded-md text-center text-sm flex overflow-clip">
            <p className="bg-primary-200 p-4 cursor-default rounded-l-md whitespace-nowrap">Sort by:</p>
            <div className="z-[1] flex-1 whitespace-nowrap">
              <SelectSortFuncButton
                text="New"
                attachedSortFuncIndex={0}
                onChangeSortFunc={onChangeSortFunc}
                direction={direction}
                currentSortFuncIndex={sortFuncIndex}
              />
              <SelectSortFuncButton
                text="Price"
                attachedSortFuncIndex={1}
                onChangeSortFunc={onChangeSortFunc}
                direction={direction}
                currentSortFuncIndex={sortFuncIndex}
              />
              <SelectSortFuncButton
                text="Duration"
                attachedSortFuncIndex={2}
                onChangeSortFunc={onChangeSortFunc}
                direction={direction}
                currentSortFuncIndex={sortFuncIndex}
              />
            </div>
          </div>
          {posts}
        </div>

        {/* Right side of page */}
      </div>
    </div>
  );
}

const SelectSortFuncButton = (props: SelectSortFuncButtonProps) => {
  const { text, onChangeSortFunc, currentSortFuncIndex, attachedSortFuncIndex, direction } = props;
  const directionIndication = direction === 1 ? "v" : "^";
  const isSelected = currentSortFuncIndex === attachedSortFuncIndex;

  return (
    <button
      onClick={() => onChangeSortFunc(attachedSortFuncIndex)}
      className={`h-full w-1/3 px-8 ${isSelected ? "bg-primary-50 shadow-inner" : ""}`}
    >
      <div className="flex items-center justify-center">
        <p>
          {text} {isSelected ? directionIndication : ""}
        </p>
      </div>
    </button>
  );
};

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Post from "../components/Trip";
import { getAllTrips } from "../firebase/asyncRequests";
import { Trip } from "../firebase/Interfaces";

type SortFunction = (a: Trip, b: Trip) => number;
type SelectSortFuncButtonProps = {
  onChangeSortFunc: (newSortFunc: SortFunction) => void;
  direction: number;
  currentSortFunc: SortFunction;
  attachedSortFunc: SortFunction;
}


export default function MainPage() {

  const [direction, setDirection] = useState<number>(1);

  const sortByNew = (a: Trip, b: Trip) => direction * (a.createdAt.toMillis() - b.createdAt.toMillis())
  const sortByPrice = (a: Trip, b: Trip) => direction * (parseInt(a.price) - parseInt(b.price))
  const sortByDuration = (a: Trip, b: Trip) => direction * (parseInt(a.duration) - parseInt(b.duration))

  const [sortFunc, setSortFunc] = useState<SortFunction>(sortByNew);

  const onChangeSortFunc = (newSortFunc: SortFunction) => {
    if (sortFunc === newSortFunc) setDirection(-direction);
    setDirection(-1);
    setSortFunc(newSortFunc);
  }
  
  const tripsQuery = useQuery({
    queryKey: ["trips"],
    queryFn: getAllTrips,
  });

  if (tripsQuery.isError) throw new Error("failed to load trips from homepage")
  
  
  
  const unsortedTrips = tripsQuery.isSuccess ? tripsQuery.data : []
  const sortedTrips = unsortedTrips.sort(sortFunc);
  const posts = sortedTrips.map(trip => <Post {...trip} key={trip.id} id={trip.id}/>)
  
  return (
    <div className="flex flex-col justify-between bg-primary-300">
      <div className="grid grid-cols-3">
        {/* Left side of page */}

        <div></div>

        {/* Middle of page */}
        <div className="h-max flex flex-col items-center gap-20 py-20">
          <div className="bg-primary-50 drop-shadow-md rounded-md text-center text-sm flex justify-between">
            <div className="flex dropdown">
              <p className="bg-primary-200 p-4 text-4 cursor-default rounded-l-md">Sort By:</p>
              <div className="z-[1] dropdown-content rounded-md m-auto">
                  <SelectSortFuncButton attachedSortFunc={sortByNew} onChangeSortFunc={onChangeSortFunc} direction={direction} currentSortFunc={sortFunc}/>
                  <SelectSortFuncButton attachedSortFunc={sortByDuration} onChangeSortFunc={onChangeSortFunc} direction={direction} currentSortFunc={sortFunc}/>
                  <SelectSortFuncButton attachedSortFunc={sortByPrice} onChangeSortFunc={onChangeSortFunc} direction={direction} currentSortFunc={sortFunc}/>
              </div>
            </div>
          </div>

        </div>

        {/* Right side of page */}
      </div>
    </div>
  );
}

const SelectSortFuncButton = (props: SelectSortFuncButtonProps) => {
  const {onChangeSortFunc, currentSortFunc, attachedSortFunc, direction} = props;
  const directionIndication = (direction === 1 ? "v" : "^");

  return <button onClick={() => onChangeSortFunc(attachedSortFunc)}>New {currentSortFunc === attachedSortFunc ? directionIndication : ""}</button>;
};
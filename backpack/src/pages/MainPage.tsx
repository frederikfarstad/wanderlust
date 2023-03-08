import { useQuery } from "@tanstack/react-query";
import Post from "../components/Trip";
import { getAllTrips } from "../firebase/asyncRequests";

export default function MainPage() {
  const tripsQuery = useQuery({
    queryKey: ["trips"],
    queryFn: getAllTrips
  })

  if (tripsQuery.isLoading) return <>Loading trips...</>
  if (tripsQuery.isError) throw new Error("failed to load trips from homepage")

// challenge: display a post to be liked or not...
// one solution is to fetch the liked list on each post. should be fine, will only be fetched once


  const trips = tripsQuery.data.map((trip) => (
    <Post key={trip.title} {...trip} id={trip.id} />
  ));

  return (
    <div className="flex flex-col justify-between bg-primary-300">
      <div className="grid grid-cols-3">
        {/* Left side of page */}

        <div></div>

        {/* Middle of page */}
        <div className="h-max flex flex-col items-center gap-20 py-20">
          {trips}
        </div>

        {/* Right side of page */}
      </div>
    </div>
  );
}

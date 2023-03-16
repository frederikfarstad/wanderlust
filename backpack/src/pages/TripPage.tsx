import CreateRating from "../components/rateTrip/CreateRating";
import RatingSection from "../components/rateTrip/RatingSection";
import TripDisplay from "../components/rateTrip/TripDisplay";

export default function TripPage() {
  return (
    <div className="grid grid-cols-6 min-h-screen bg-primary-300 py-20 gap-8">
      <div className="col-start-2 col-span-4">
        <TripDisplay />
      </div>
      <div className="col-start-2 col-span-4">
        <CreateRating handleCreate={() => {}} />
      </div>
      <div className="col-start-2 col-span-4">
        <RatingSection />
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import CreateRating from "../components/rateTrip/CreateRating";
import RatingSection from "../components/rateTrip/RatingSection";
import TripDisplay from "../components/rateTrip/TripDisplay";
import TripLayout from "../components/trip/TripLayout";

export default function TripPage() {
  const { tripId } = useParams()
  if (!tripId) throw new Error("tried navigating to tripPage with invalid tripId")
  return (
    <div className="grid grid-cols-6 min-h-screen bg-primary-300 py-20 gap-8">
      <div className="col-start-2 col-span-4">
        <TripLayout tripId={tripId} />
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

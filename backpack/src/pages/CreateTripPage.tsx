import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Trip, Location } from "../components/createTrip/interface";
import LocationDisplay from "../components/createTrip/LocationDisplay";
import {
  createNewTrip,
  getTripForEdit,
  updateExistingTrip,
} from "../firebase/PostUtils";

/**
 * Can either be creating a new post, or editing an existing one.
 * Creating a new post is fairly straigh forward. Many input fields to fill
 * and at the end you send it to the database
 *
 * Editing requires more work.
 * We need to access the post from database. If it does not exist, give feedback.
 * If someone is trying to edit post not made by them, give feedback.
 *
 * When these checks pass, we load the form with existing data,
 * and when complete, we overwrite existing post instead of creating a new one
 */

export default function CreateTripPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [trip, setTrip] = useState<Trip | null>(null);

  const { tripId } = useParams();

  useEffect(() => {
    const getTrip = async () => {
      setTrip(await getTripForEdit(tripId));
    };
    getTrip();
  }, []);

  useEffect(() => {
    console.log("effect");
    if (trip) {
      console.log("trip");
      // At this point we have confirmed that the post exists, and that the owner wants to edit it
      setTitle(trip.title);
      setDescription(trip.description);
      setDuration(trip.duration);
      setPrice(trip.price);
      setLocations(trip.locations);
      setPrice(trip.price);
      console.log(locations);
    }
  }, [trip]);

  if (!tripId) {
    return <>trip id problem</>;
  }

  const editing = trip !== null;

  const handleAddLocation = (locations: Location[]) => {
    setLocations(locations);
  };

  const tripToPost = { title, description, duration, price, locations };

  const handlePost = async () => {
    if (editing) {
      await updateExistingTrip(tripToPost, tripId);
    } else {
      await createNewTrip(tripToPost);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary-300 py-4">
      <div className="py-8 px-4 bg-primary-100 rounded-xl w-2/3">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          {editing ? "Edit your trip!" : "Post your trip!"}
        </h2>

        <div>
          <div className="grid grid-cols-2 gap-4">
            <label className="col-span-2">
              Title
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Name of trip"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label className="col-span-2">
              Description
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Describe your trip"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <div className="col-span-2 flex flex-row items-center">
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className="text-sm font-light text-gray-500 px-4">
                Add a stop to your trip
              </div>
              <div className="flex-1 h-px bg-gray-300"></div>
              <div></div>
            </div>

            <div className="col-span-2 w-full">
              <LocationDisplay
                locations={locations}
                handleAddLocation={handleAddLocation}
              />
            </div>

            <label>
              Duration
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="How long did it take"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </label>

            <label>
              Price
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="How much did it cost"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>

            <div className="col-span-2 flex justify-between">
              <Link to="/">
                <button
                  onClick={handlePost}
                  disabled={locations.length === 0}
                  type="submit"
                  className="inline-flex items-center justify-center col-span-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 disabled:bg-primary-400"
                >
                  Post
                </button>
              </Link>
              <Link to="/">
                <button className="inline-flex items-center justify-center col-span-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 disabled:bg-primary-400">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

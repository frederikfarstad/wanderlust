import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Trip, Location } from "../firebase/Interfaces";
import LocationDisplay from "../components/createTrip/LocationDisplay";
import {
  createTrip,
  getTripById,
  getTripForEdit,
  updateTrip,
} from "../firebase/asyncRequests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUid } from "../utils/FirebaseUtils";
import InputWithValidation from "../components/InputWithValidation";
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
  const [editing, setEditing] = useState(false);

  const { tripId } = useParams();
  if (!tripId) throw new Error("invalid trip id");

  const validTitle = (title: string) => {
    if (title.length != 0) return true;
    else return false;
  };


  const validPrice = /^\d+\.?\d*$/.test(price);

  const tripQuery = useQuery({
    queryKey: ["trips", tripId],
    queryFn: () => getTripForEdit(tripId),
  });

  useEffect(() => {
    if (tripQuery.isSuccess && tripQuery.data.createdBy === getUid()) {
      setEditing(true)
      setTitle(tripQuery.data.title || "");
      setDescription(tripQuery.data.description || "");
      setDuration(tripQuery.data.duration || "");
      setPrice(tripQuery.data.price || "");
      setLocations(tripQuery.data.locations || []);
    }
  }, [tripQuery.isSuccess, tripQuery.data]);

  const queryClient = useQueryClient();
  const createTripMutation = useMutation({
    mutationFn: createTrip,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["trips"], { exact: true });
    },
  });
  const updateTripMutation = useMutation({
    mutationFn: updateTrip,
    onSuccess: () => {
      queryClient.invalidateQueries(["trips"]);
    },
  });

  if (tripQuery.isLoading) return <>Loading trip ...</>;
  if (tripQuery.isError) return <>{JSON.stringify(tripQuery.error)}</>;

  const tripToPost = {
    id: tripId,
    title,
    description,
    duration,
    price,
    locations,
  } as Trip;

  const handlePost = () => {
    if (editing) {
      updateTripMutation.mutate({ tripId, tripData: tripToPost });
    } else {
      createTripMutation.mutate(tripToPost);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary-300 dark:bg-dark-300 dark:text-dark-900 py-4">
      <div className="py-8 px-4 bg-primary-100 dark:bg-dark-100 rounded-xl w-2/3">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {editing ? "Edit your trip!" : "Post your trip!"}
        </h2>

        <div>
          <div className="grid grid-cols-2 gap-4">
            <label className="col-span-2">
              <InputWithValidation
                label="Title"
                type="text"
                value={title}
                isValid={validTitle(title)}
                handleChange={setTitle}
                explanation={!validTitle(title) ? "Please enter a title for your trip" : ""}
                isAffectedByDarkMode
              />
            </label>

            <label className="col-span-2 block text-sm font-medium text-slate-700 dark:text-white">
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
              <div className="text-sm font-light text-gray-500 px-4">Add a stop to your trip</div>
              <div className="flex-1 h-px bg-gray-300"></div>
              <div></div>
            </div>

            <div className="col-span-2 w-full">
              <LocationDisplay
                locations={locations}
                handleAddLocation={(locations: Location[]) => setLocations(locations)}
              />
            </div>

            <label>
              <InputWithValidation
                label="Duration"
                type="number"
                value={duration}
                isValid={duration.length != 0}
                handleChange={setDuration}
                explanation={duration.length == 0 ? "Please enter the duration of your trip in days" : ""}
                isAffectedByDarkMode
              />
            </label>

            <label>
              <InputWithValidation
                label="Price"
                type="number"
                value={price}
                isValid={validPrice}
                handleChange={setPrice}
                explanation={!validPrice ? "Please enter the price of the trip in EUR" : ""}
                isAffectedByDarkMode
              />
            </label>

            <div className="col-span-2 flex justify-between">
              <Link to="/">
                <button
                  onClick={handlePost}
                  disabled={locations.length === 0 || !validPrice || !validTitle(title) || duration.length == 0}
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

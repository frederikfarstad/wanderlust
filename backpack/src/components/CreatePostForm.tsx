import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import useUserInfo from "../hooks/useUserInfo";
import { postRoute, Route } from "../utils/FirebaseUtils";

interface Stop {
  country: string;
  province: string;
  area: string;
}




export default function CreatePostForm() {
  const {uid} = useUserInfo()

  const [title, setTitle] = useState<string>("")
  const [duration, setDuration] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [stops, setStops] = useState<Stop[]>([]);


  const handlePost = async() => {
    // TODO : fix description to be not empty
    const route = {title, description:"", duration, price, locations : stops} as Route
    console.log(stops)
    const uid = auth.currentUser?.uid as string
    postRoute(uid, route)
    await addDoc(collection(db, "Routes"), {
      title,
      description : "",
      price,
      duration,
      locations: stops,
      createdBy: uid,
      createdAt: Timestamp.fromDate(new Date())
    });
  }

  const handleAddStop = (stop: Stop) => {
    const newStops = [...stops];
    newStops.push(stop);
    setStops(newStops);
  };

  const stopElements = stops.map((s, i) => <ListElement key={i} {...s} />);

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary-300 py-4">
      <div className="py-8 px-4 bg-primary-100 rounded-xl">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Post a new route!
        </h2>

        <form>
          <div className="grid grid-cols-2 gap-4">
            <label className="col-span-2">
              Title
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Name of trip"
                value={title}
                onChange={e => setTitle(e.target.value)}
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

            <div className="col-span-2">
              <ol className="relative border-l border-gray-700">
                {stopElements}
              </ol>
            </div>

            <div className="col-span-2 flex justify-center">
              <AddLocationSection addStop={handleAddStop} />
            </div>

            <label>
              Duration
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="How long did it take"
                value={duration}
                onChange={e => setDuration(e.target.value)}
              />
            </label>

            <label>
              Price
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="How much did it cost"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </label>

            <Link to="/">

            <button
              onClick={handlePost}
              disabled={stops.length === 0}
              type="submit"
              className="inline-flex items-center justify-center col-span-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 disabled:bg-primary-400"
              >
              Post!
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

type AddLocationSectionProps = {
  addStop: (stop: Stop) => void;
};

const AddLocationSection = ({ addStop }: AddLocationSectionProps) => {
  const [country, setCountry] = useState("Norway");
  const [province, setProvince] = useState("");
  const [area, setArea] = useState("");

  const handleClick = () => {
    const stop = { country, province, area } as Stop;
    setProvince("");
    setArea("");
    addStop(stop);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <label>
          Country
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Province
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </label>
        <label>
          Area
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </label>
      </div>
      <button
        onClick={handleClick}
        disabled={area === ""}
        className="inline-flex items-center justify-center col-span-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 disabled:bg-primary-300 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
      >
        Add stop
      </button>
    </div>
  );
};

function ListElement({ country, province, area }: Stop) {
  return (
    <li className="mb-10 ml-4">
      <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -left-1.5 border border-white"></div>
      <h3 className="text-lg font-semibold text-gray-900">{country}</h3>
      <p className="mb-4 text-base font-normal text-gray-500">
        {province}, {area}
      </p>
    </li>
  );
}

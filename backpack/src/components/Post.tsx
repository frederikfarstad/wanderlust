import { collection, doc, getDoc, Timestamp } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trip } from "./createTrip/interface";
import defaultpfp from "../public/pfp.png";
import { auth, db } from "../firebase/firebase-config";
import { User } from "../firebase/UserUtils";
import { deleteTrip } from "../firebase/PostUtils";

export default function Post({
  id,
  title,
  description,
  duration,
  price,
  locations,
  createdAt,
  createdBy,
  edited,
}: Trip) {
  const uid = auth.currentUser?.uid;
  const [dummy, setDummy] = useState(false);
  const [pfp, setPfp] = useState(defaultpfp);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        if (createdBy) {
          const userSnap = await getDoc(doc(db, "users", createdBy));
          if (userSnap.exists()) {
            const userData = userSnap.data() as User;
            setPfp(userData.profilepicture);
            setUsername(userData.username);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [uid]);

  const owner = createdBy == uid;
  const stopElements = locations.map((s, i) => <ListElement key={i} {...s} />);

  const handleDelete = async () => {
    if (id) {
      await deleteTrip(id);
    }
    setDummy(!dummy);
  };

  return (
    <div className="bg-blue-100 rounded-xl p-4 w-full relative group">
      {owner && (
        <div className="flex flex-col gap-2 absolute top-4 right-4 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleDelete}
            className="text-sm font-light text-gray-500"
          >
            Delete
          </button>
          <Link to={"/create/" + id}>
            <button className="text-sm font-light text-gray-500">Edit</button>
          </Link>
        </div>
      )}
      <Link to={"/profile/" + createdBy}>
        <div className="flex flex-wrap items-center">
          <img src={pfp} className="h-8 w-8 bg-primary-600 rounded-full" />
          <div className="px-2">
            <div className="self-center text-sm font-semibold">{username}</div>
            <div className="text-xs text-gray-800 flex items-center">
              {moment(createdAt?.toDate()).fromNow()}
            </div>
          </div>
        </div>
      </Link>
      <div className="text-center text-xl font-semibold mt-4">{title}</div>
      <div className="py-2 px-4">
        <ol className="relative border-l border-gray-700">{stopElements}</ol>
      </div>
      {description}
      <div className="bg-gray-600 h-px"></div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div>Price: {price}</div>
          <div>Duration: {duration}</div>
        </div>
        <div className="flex flex-row">
          <IconFavorite />
          <IconLike />
        </div>
      </div>
      {edited ? (
        <div className="text-xs text-gray-800 flex items-center">
          edited: {moment(edited.toDate()).fromNow()}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

interface Stop {
  country: string;
  province: string;
  area: string;
}

export function ListElement({ country, province, area }: Stop) {
  return (
    <li className="mb-6 ml-4">
      <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -left-1.5 border border-white"></div>
      <h3 className=" text-xs font-semibold text-gray-900">{country}</h3>
      <p className="mb-4 text-xs  font-normal text-gray-500">
        {province}, {area}
      </p>
    </li>
  );
}

function IconFavorite() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
      <path d="M21.919 10.127a1 1 0 00-.845-1.136l-5.651-.826-2.526-5.147a1.037 1.037 0 00-1.795.001L8.577 8.165l-5.651.826a1 1 0 00-.556 1.704l4.093 4.013-.966 5.664a1.002 1.002 0 001.453 1.052l5.05-2.67 5.049 2.669a1 1 0 001.454-1.05l-.966-5.665 4.094-4.014a1 1 0 00.288-.567zm-5.269 4.05a.502.502 0 00-.143.441l1.01 5.921-5.284-2.793a.505.505 0 00-.466 0L6.483 20.54l1.01-5.922a.502.502 0 00-.143-.441L3.07 9.98l5.912-.864a.503.503 0 00.377-.275L12 3.46l2.64 5.382a.503.503 0 00.378.275l5.913.863-4.28 4.197z" />
    </svg>
  );
}

function IconLike() {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">
      <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z" />
    </svg>
  );
}

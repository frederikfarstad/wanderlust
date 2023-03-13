import "../index.css";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase-config";
import defaultpfp from "../public/pfp.png";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../firebase/UserUtils";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const uid = auth.currentUser?.uid;
  const [pfp, setPfp] = useState(defaultpfp);
  const [username, setUsername] = useState("");

  const { urlID } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (urlID) {
          const userSnap = await getDoc(doc(db, "users", urlID));
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

  const isProfileOwner = uid && uid === urlID;
  const [type, setType] = useState<"posts" | "likes" | "favorites">("posts");

  const routeElemen = <>No posts to display</>;

  return (
    <div className="bg-primary-300 dark:bg-dark-300 p-20">
      <div className="flex gap-4 items-center">
        <img src={pfp} className="w-20 h-20 bg-primary-600 rounded-full" />
        <div className="self-center text-xl font-semibold">{username}</div>
        <button
          onClick={() => setType("posts")}
          type="button"
          className="ml-20 text-white h-12 bg-primary-700  dark:bg-dark-400 hover:bg-primary-800 dark:hover:bg-dark-50 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
        >
          {isProfileOwner ? "My posts" : username + "'s posts"}
        </button>
        <button
          onClick={() => setType("favorites")}
          type="button"
          className="ml-20 text-white h-12 bg-primary-700  dark:bg-dark-400 hover:bg-primary-800 dark:hover:bg-dark-50 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
        >
          {isProfileOwner
            ? "My favourite posts"
            : username + "'s favourite posts"}
        </button>
        {isProfileOwner ? (
          <button
            onClick={() => setType("likes")}
            type="button"
            className="ml-20 text-white h-12 bg-primary-700 dark:bg-dark-900 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
          >
            My liked posts
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className=" mt-20 grid grid-cols-3 gap-4">{routeElemen}</div>
    </div>
  );
}

export default ProfilePage;

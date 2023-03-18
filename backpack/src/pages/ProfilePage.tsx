import "../index.css";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase-config";
import defaultpfp from "../public/pfp.png";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ImageUploading from "react-images-uploading";
import { Trip, User } from "../firebase/Interfaces";
import { getAllFavoritedTripsFromUserId, getAllTripsByUserId, setUserProfilePicture } from "../firebase/asyncRequests";
import TripDisplay from "../components/Trip";

function ProfilePage() {
  const uid = auth.currentUser?.uid;
  const [username, setUsername] = useState("");
  const { urlID } = useParams();
  const [pfpUrl, setPfpUrl] = useState(defaultpfp);

  //console.log("uid", uid, "urlID", urlID);
  const isProfileOwner = uid && uid === urlID;
  const [type, setType] = useState<"posts" | "favorites">("posts");
  const [posts, setPosts] = useState<JSX.Element[]>([]);

  const storage = getStorage();
  const storageProfilePicture = ref(storage, "profilepics/" + urlID);
  const [image, setImage] = useState([] as any);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (urlID !== undefined) {
          const userSnap = await getDoc(doc(db, "users", urlID));
          if (userSnap.exists()) {
            const userData = userSnap.data() as User;
            setPfpUrl(userData.profilepicture);
            setUsername(userData.username);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getImage = async () => {
      try {
        const url = await getDownloadURL(storageProfilePicture);
        console.log("Got profile picture from storage", url);
        setImage([{ data_url: url }]);
      } catch (error) {
        console.log("No profile picture in storage");
      }
    };

    getImage();
    getUser();
  }, [uid, urlID]);

  const onChange = (imageList: any) => {
    setImage(imageList);

    /* Upload profile picture to storage */
    const imageFile = imageList[0].file;
    uploadBytes(storageProfilePicture, imageFile).then(async (uploadResult) => {
      const imageUrl = await getDownloadURL(storageProfilePicture);
      if (uid !== undefined) setUserProfilePicture(uid, imageUrl);
      setPfpUrl(imageUrl);
    });
    console.log("Updated profile picture in storage", imageList[0].file.name, storageProfilePicture);
  };

  const getTrips: Promise<Trip[]> = new Promise(async (resolve, reject) => {
    if (urlID === undefined) {
      reject();
      return;
    }

    switch (type) {
      case "posts":
        return resolve(await getAllTripsByUserId(urlID));

      case "favorites":
        return resolve(await getAllFavoritedTripsFromUserId(urlID));

      default:
        return resolve([]);
    }
  });

  const updatePosts = () => {
    getTrips.then((trips) => {
      const newPosts = trips.map((trip) => <TripDisplay key={trip.id} {...trip} id={trip.id}></TripDisplay>);
      setPosts(newPosts);
    });
  };

  useEffect(updatePosts, [type, urlID]);

  return (
    <div className="bg-primary-300 dark:bg-dark-300 p-20">
      <div className="flex gap-4 items-center">
        <ImageUploading
          value={image}
          onChange={onChange}
          acceptType={["jpg", "jpeg", "gif", "png"]}
          dataURLKey="data_url"
        >
          {({ onImageUpload }) => (
            <div className="upload__image-wrapper relative">
              {pfpUrl !== undefined && pfpUrl !== null ? (
                <img src={pfpUrl} className="w-20 h-20 bg-primary-600 rounded-full" />
              ) : (
                <img src={defaultpfp} className="w-20 h-20 bg-primary-600 rounded-full" />
              )}
              <button
                onClick={onImageUpload}
                className={isProfileOwner ? "bg-blue-600 text-white p-1 rounded-lg mt-5" : "hidden"}
              >
                Upload image
              </button>
            </div>
          )}
        </ImageUploading>
        <div className="self-center text-xl font-semibold dark:text-white">{username}</div>
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
          {isProfileOwner ? "My favourite posts" : username + "'s favourite posts"}
        </button>
      </div>
      <p className="mt-10 dark:text-white">
        {(type as string).substring(0, 1).toUpperCase() + (type as string).substring(1)}
      </p>
      <hr />
      <div className="mt-2 grid grid-cols-3 gap-4">{posts}</div>
    </div>
  );
}

export default ProfilePage;

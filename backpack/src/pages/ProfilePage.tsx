import "../index.css";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase-config";
import defaultpfp from "../public/pfp.png";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../firebase/UserUtils";
import { useParams } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ImageUploading from "react-images-uploading";



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

  const storage = getStorage();
  const storageProfilePicture = ref(storage, "profilepics/"+ uid);

  const [image, setImage] = useState([] as any);

  async function getImage() {
    try {
      const url = await getDownloadURL(storageProfilePicture)
      console.log("Got profile picture from storage", url);
      setImage([{data_url: url}]);
    } catch (error) {
      console.log("No profile picture in storage");
    }
  }

  useEffect(() => {
    getImage();
  }, [])

  const onChange = (imageList: any) => {
    console.log(imageList);
    setImage(imageList);

    /* Upload profile picture to storage */
    uploadBytes(storageProfilePicture, imageList[0].file);
    console.log("Updated profile picture in storage", imageList[0].file.name, storageProfilePicture);
  }

  const isProfileOwner = uid && uid === urlID;
  const [type, setType] = useState<"posts" | "likes" | "favorites">("posts");

  const routeElemen = <>No posts to display</>;

  return (
    <div className="bg-primary-300 p-20">
      <div className="flex gap-4 items-center">
        <ImageUploading
          value={image}
          onChange={onChange}
          acceptType={["jpg", "jpeg", "gif", "png"]}
          dataURLKey="data_url"
        >
          {({
            onImageUpload,
          }) => (
            <div className="upload__image-wrapper relative">
              {image.length == 0 
                ? <img src={pfp} className="w-20 h-20 bg-primary-600 rounded-full" />
                : <img src={image.length == 0 ? pfp : image[0].data_url} className="w-20 h-20 bg-primary-600 rounded-full" />}
              <button onClick={onImageUpload} className={isProfileOwner ? "bg-blue-600 text-white p-1 rounded-lg mt-5" : "hidden"}>Upload image</button>
            </div>
          )}
        </ImageUploading>
        <div className="self-center text-xl font-semibold">{username}</div>
        <button
          onClick={() => setType("posts")}
          type="button"
          className="ml-20 text-white h-12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
        >
          {isProfileOwner ? "My posts" : username + "'s posts"}
        </button>
        <button
          onClick={() => setType("favorites")}
          type="button"
          className="ml-20 text-white h-12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
        >
          {isProfileOwner
            ? "My favourite posts"
            : username + "'s favourite posts"}
        </button>
        {isProfileOwner ? (
          <button
            onClick={() => setType("likes")}
            type="button"
            className="ml-20 text-white h-12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
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

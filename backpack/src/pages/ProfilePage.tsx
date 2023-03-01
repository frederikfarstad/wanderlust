import TripView from "../components/TripView";
import "../index.css";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import useFirebaseCollection from "../hooks/useFirebaseData";
import useUserInfo from "../hooks/useUserInfo";
import { getUserCollection, getUserInfo, Route } from "../utils/FirebaseUtils";
import moment from "moment";
import Post from "../components/Post";
import { useState } from "react";
import ImageUploading from "react-images-uploading";

interface Trip {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  rating: number;
  start: string;
  end: string;
}

function ProfilePage() {
  const { uid } = useUserInfo();
  let { id: urlID } = useParams();

  const currentUsersProfile = uid === urlID
  const { pfp, username} = getUserInfo(urlID as string)

  const [image, setImage] = useState([] as any);

  const onChange = (imageList: any) => {
    console.log(imageList, imageList[0].data_url);
    setImage(imageList);
  }

  const [type, setType] = useState<"posts" | "likes" | "favorites">("posts")

  console.log(type)

  const routes = getUserCollection(urlID as string, type);

    const routeElemen = routes.length ? routes?.map((r) => <Post {...r} />) : <>No posts to display</>;


  
  console.log(routes)

  return <div className="bg-primary-300 p-20">
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
          // write your building UI
          <div className="upload__image-wrapper relative">
            {image.length == 0 
              ? <img src={pfp} className="w-20 h-20 bg-primary-600 rounded-full" />
              : <img src={image.length == 0 ? pfp : image[0].data_url} className="w-20 h-20 bg-primary-600 rounded-full" />}
            <button onClick={onImageUpload} className="bg-blue-600 text-white p-1 rounded-lg mt-5">Upload image</button>
          </div>
        )}
      </ImageUploading>
    
      <div className="self-center text-xl font-semibold">{username}</div>
      <button onClick={() => setType("posts")} type="button" className="ml-20 text-white h-12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">{currentUsersProfile ? "My posts" : username + "'s posts" }</button>
      <button onClick={() => setType("favorites")} type="button" className="ml-20 text-white h-12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">{currentUsersProfile ? "My favourite posts" : username + "'s favourite posts" }</button>
      {currentUsersProfile ? <button onClick={() => setType("likes")} type="button" className="ml-20 text-white h-12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">My liked posts</button> : <></>}
    </div>
    <div className=" mt-20 grid grid-cols-3 gap-4">{routeElemen}</div>
  </div>;
}

export default ProfilePage;


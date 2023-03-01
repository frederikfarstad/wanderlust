import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import defaultpfp from "../public/pfp.png";

type SignupData = {
  email: string;
  username: string;
  fullname: string;
  password: string;
  repeatPassword: string;
};

const usersRef = doc(collection(db, "users"));

/**
 * After registering a user with firebase auth, we need to store the user in a separate users table aswell.
 * This is to make sure we can access information about users that are not logged in.
 *
 * TODO : store profile picture aswell
 */

export const createUser = async (
  uid: string,
  email: string,
  fullname: string,
  username: string,
  profilepicture: string | null
) => {
  await setDoc(doc(db, "users", uid), {
    email,
    fullname,
    username,
    profilepicture,
    createdAt: Timestamp.fromDate(new Date()),
  });
};

export interface Route {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  locations: {
    area: string;
    country: string;
    province: string;
  }[];
  createdAt: Timestamp;
  createdBy: string;
}

/**
 * When a user creates a post, we store it in the users collection.
 * Makes it easy to query all posts made by a user.
 * We could avoid this: if we store a collection of all posts, and include the uid of the creator, this would not be necessary.
 *
 *
 *  */

export const postRoute = async (uid: string, post: Route) => {
  await addDoc(collection(doc(db, "users", uid), "posts"), {
    ...post,
    createdAt: Timestamp.fromDate(new Date()),
  });
};

/**
 * @returns boolean indicating success with signup
 *
 * Creates a new user for the website.
 * Store signup details in firebase auth for login,
 * and in 'users' collection to make it possible to access user data
 */
export const SubmitSignup = async (data: SignupData) => {
  const { email, username, fullname, password } = data;

  const success = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredentials) => {
      const user = userCredentials.user;
      await updateProfile(user, { displayName: username });

      createUser(user.uid, email, fullname, username, null);

      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return success;
};

export interface UserInfo {
  username: string;
  pfp: string;
}

// TODO : access profile picture (better)
// TODO : handle not finding a user better
// TODO : rewrite this
export const getUserInfo = (uid: string): UserInfo => {

  if (!uid) {
    return {pfp : defaultpfp, username: ""}
  }


  const userRef = doc(db, "users", uid);
  const [username, setUsername] = useState<string>("missing");
  const [pfp, setPfp] = useState<string | null>(null);
  const [posts, setPosts] = useState<Route[]>([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      console.log("fetching user: ", uid);
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          let name = userDoc.data().username
          name = name ? name : "missing" as string
          setUsername(name);
          setPfp(userDoc.data().profilepicture);
        } else {
          console.log("user does not exist");
        }
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    };
    fetchUserInfo();
  }, []);
  const image = pfp ? pfp : defaultpfp;
  return { pfp: image, username };
};

// Not sure if there is a good way to combine this with the function above. Also not sure if that is necessary
/**
 * Each user has 3 collections (currently): posts, likes, favorites
 * The function returns one of them, specified by collectionName
 *  */
export const getUserCollection = (
  uid: string,
  collectionName: "posts" | "likes" | "favorites"
): Route[] => {
  const collectionRef = collection(db, "users", uid, collectionName);
  const [data, setData] = useState<Route[]>([]);


  useEffect(() => {
    console.log("fetching data from ", uid)
    const fetchData = async () => {
      try {
        const data = await getDocs(collectionRef)
        const filteredData = data.docs.map(d => ({...d.data(), id: d.id})) as Route[]
        setData(filteredData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return data;
};


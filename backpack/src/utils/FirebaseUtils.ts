import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
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
  const userRef = doc(db, "users", uid);
  const [username, setUsername] = useState<string>("Some user")
  const [pfp, setPfp] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      console.log("fetching user: ", uid)
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          // This can be done better but I am too tiered atm
          const name = userDoc.data().username
          const profilepic = userDoc.data().profilepicture
          setUsername(userDoc.data().username);
          setPfp(profilepic)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo()
  }, []);
  const image = pfp ? pfp : defaultpfp
  return { pfp : image, username}
};


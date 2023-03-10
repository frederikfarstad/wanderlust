import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase-config";
import { UserInfo } from "../firebase/DataInterfaces";
import defaultpfp from "../public/pfp.png";
import { Trip } from "../components/createTrip/interface";

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

/**
 * When a user creates a post, we store it in the users collection.
 * Makes it easy to query all posts made by a user.
 * We could avoid this: if we store a collection of all posts, and include the uid of the creator, this would not be necessary.
 *
 *
 *  */

export const postTrip = async (uid: string, post: Trip) => {
  await addDoc(collection(doc(db, "users", uid), "posts"), {
    ...post,
    createdAt: Timestamp.fromDate(new Date()),
  });
};

/**
 * @returns {success: boolean indicating success with signup, message: message indicating reason for failure}
 *
 * Creates a new user for the website.
 * Store signup details in firebase auth for login,
 * and in 'users' collection to make it possible to access user data
 */
export const SubmitSignup = async (data: SignupData) => {
  const { email, username, fullname, password } = data;

  // const userCollection = collection(db, "users");
  // const usernameTakenQuery = query(
  //   userCollection,
  //   where("username", "==", username)
  // );
  // const usernameTakenSnapshot = await getDocs(usernameTakenQuery);

  // if (!usernameTakenSnapshot.empty)
  //   return { success: false, message: "Username taken!" };

  const response = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredentials) => {
      const user = userCredentials.user;
      await updateProfile(user, { displayName: username });

      createUser(user.uid, email, fullname, username, null);

      return { success: true, message: "Success" };
    })
    .catch((err) => {
      return { success: false, message: err.message };
    });
  return response;
};

// TODO : access profile picture (better)
// TODO : handle not finding a user better
// TODO : rewrite this
export const getUserInfo = (uid: string): UserInfo => {
  if (!uid) {
    return { pfp: defaultpfp, username: "" };
  }

  const userRef = doc(db, "users", uid);
  const [username, setUsername] = useState<string>("missing");
  const [pfp, setPfp] = useState<string | null>(null);
  const [posts, setPosts] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      console.log("fetching user: ", uid);
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          let name = userDoc.data().username;
          name = name ? name : ("missing" as string);
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
// NOTE: this will probably be removed soon, it is a bad solution
export const getUserCollection = (
  uid: string,
  collectionName: "posts" | "likes" | "favorites"
): Trip[] => {
  const collectionRef = collection(db, "users", uid, collectionName);
  const [data, setData] = useState<Trip[]>([]);

  useEffect(() => {
    console.log("fetching data from ", uid);
    const fetchData = async () => {
      try {
        const data = await getDocs(collectionRef);
        const filteredData = data.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        })) as Trip[];
        setData(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return data;
};

// DELETE THIS: this is not how we should do get requests

export const getPostById = (postId: string) => {
  const [post, setPost] = useState<Trip>({} as Trip);
  const [error, setError] = useState(true);
  const postRef = doc(db, "Routes", postId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = await getDoc(postRef);
        const filteredData = { ...temp.data(), id: temp.id } as Trip;
        setPost(filteredData);
        setError(false);
      } catch (error) {
        console.log("can't get post", error);
      }
    };
    fetchData();
  }, []);

  return { post, error };
};

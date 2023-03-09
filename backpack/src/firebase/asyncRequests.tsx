import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getUid } from "../utils/FirebaseUtils";
import { auth, db } from "./firebase-config";
import { Review, Trip, User } from "./Interfaces";

/**
 * TODO :
 *
 * - get all trips x
 *
 * - get user (uid) x
 *
 * - get trip (pid) x
 * - create trip x
 * - update trip (pid)
 * - delete trip (pid)
 *
 * For profile
 * - get all trips by user (uid, pid[]) x
 * - get all likeds trip by user (uid, pid[]) x
 * - get all review on post ()
 *
 *
 * MainPage : get some trips, with slight filtering. Check if post is liked or not ... oh boy
 *
 * ProfilePage : get trips by user, get liked trips, get trips with review by user
 */

/* ############## TRIP FUNCTIONS ############## */

export const getAllTrips = async (): Promise<Trip[]> => {
  const tripsSnap = await getDocs(collection(db, "trips"));
  const tripData = tripsSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Trip[];
  return tripData;
};

export const createTrip = async (trip: Trip) => {
  return await addDoc(collection(db, "trips"), {
    ...trip,
    createdAt: Timestamp.fromDate(new Date()),
    createdBy: getUid(),
  });
};
export const deleteTrip = async (tripId: string) => {
  await deleteDoc(doc(db, "trips", tripId));
};

export const updateTrip = async ({tripData, tripId} : {tripData: Trip, tripId: string} ) => {
  await updateDoc(doc(db, "trips", tripId), {
    ...tripData,
    edited: Timestamp.fromDate(new Date()),
  });
};

export async function getTripsFromIdList(tripIds: string[]): Promise<Trip[]> {
  const q = query(collection(db, "trips"), where("__name__", "in", tripIds));
  const tripsSnap = await getDocs(q);
  const tripsData = tripsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Trip[];
  return tripsData;
}

export const getTripForEdit = async (tripId: string | undefined) => {
  if (!tripId || tripId === "new") {
    return null;
  }

  try {
    const tripSnap = await getDoc(doc(db, "trips", tripId));
    if (tripSnap.exists()) {
      return { ...tripSnap.data(), id: tripSnap.id } as Trip;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const toggleLiked = async ({uid, liked} : {uid: string, liked: string[]}) => {
   await updateDoc(doc(db, "users", uid), {
    liked
   })
}
export const toggleFavourited = async ({uid, favorited} : {uid: string, favorited: string[]}) => {
  console.log("async", favorited)
   await updateDoc(doc(db, "users", uid), {
    favorited
   })
}



/* ############## USER FUNCTIONS ############## */

export const getAllUsers = async () => {
  const usersSnap = await getDocs(collection(db, "users"))
  return usersSnap.docs.map(doc => ({...doc.data(), id: doc.id})) as User[]
}

export const getUserById = async (id: string) : Promise<User> => {
   const userSnap = await getDoc(doc(db, "users", id))
   if (!userSnap.exists()) throw new Error(`invalid id (${id}), cannot find user`)
   return userSnap.data() as User
}

export const createUser = async (userInfo: User) => {
  if (!userInfo.id) throw new Error("invalid id, cannot create user");
  await setDoc(doc(db, "users", userInfo.id), {
    ...userInfo,
    createdAt: Timestamp.fromDate(new Date()),
  });
};

export const updateUser = async (uid: string) => {
  await updateDoc(doc(db, "users", uid), {
    lastLogin: Timestamp.fromDate(new Date()),
  });
};

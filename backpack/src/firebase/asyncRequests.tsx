import {
  addDoc,
  arrayRemove,
  arrayUnion,
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
import { db } from "./firebase-config";
import { RatingInterface, Trip, User } from "./Interfaces";

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

export const updateTrip = async ({
  tripData,
  tripId,
}: {
  tripData: Trip;
  tripId: string;
}) => {
  await updateDoc(doc(db, "trips", tripId), {
    ...tripData,
    edited: Timestamp.fromDate(new Date()),
  });
};

export const getTripById = async (tripId: string) => {
  const tripSnap = await getDoc(doc(db, "trips", tripId));
  if (!tripSnap.exists()) throw new Error("No trip with that name");
  return { id: tripSnap.id, ...tripSnap.data() } as Trip;
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

export const toggleLiked = async ({
  uid,
  liked,
}: {
  uid: string;
  liked: string[];
}) => {
  await updateDoc(doc(db, "users", uid), {
    liked,
  });
};
export const toggleFavourited = async ({
  uid,
  favorited,
}: {
  uid: string;
  favorited: string[];
}) => {
  console.log("async", favorited);
  await updateDoc(doc(db, "users", uid), {
    favorited,
  });
};

/* ############## USER FUNCTIONS ############## */

export const getAllUsers = async () => {
  const usersSnap = await getDocs(collection(db, "users"));
  return usersSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as User[];
};

export const getUserById = async (id: string): Promise<User> => {
  const userSnap = await getDoc(doc(db, "users", id));
  if (!userSnap.exists())
    throw new Error(`invalid id (${id}), cannot find user`);
  return userSnap.data() as User;
};

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

/* ############## RATING FUNCTIONS ############## */

interface RatingData {
  ratingId?: string;
  tripId: string;
  createdBy: string;
  text: string;
  rating: number;
}

export const getRatingsByTripId = async (tripId: string) => {
  const q = query(collection(db, "ratings"), where("tripId", "==", tripId));
  const ratingsSnap = await getDocs(q);
  return ratingsSnap.docs.map((doc) => ({
    ratingId: doc.id,
    ...doc.data(),
  })) as RatingInterface[];
};

/* Should this also find the trip? Idk, can be done on profile */
export const getRatingsByCreator = async (uid: string) => {
  const q = query(collection(db, "ratings"), where("createdBy", "==", uid));
  const ratingsSnap = await getDocs(q);
  return ratingsSnap.docs.map((doc) => ({
    ratingId: doc.id,
    ...doc.data(),
  })) as RatingInterface[];
};

/* TODO : Need to update average rating */

/* The reason ratingId is passed as prop, is so that the signature matches with update. We don't actually need it here */
export const createRating = async ({
  ratingId,
  tripId,
  createdBy,
  text,
  rating,
}: RatingData) => {
  const ratingDocRef = await addDoc(collection(db, "ratings"), {
    tripId,
    createdBy,
    text,
    rating,
    createdAt: Timestamp.fromDate(new Date()),
  });

  /* Store information about the created rating in user ratings array */
  await updateDoc(doc(db, "users", createdBy), {
    ratings: arrayUnion({ tripId, ratingId: ratingDocRef.id }),
  });
};

export const updateRating = async ({
  ratingId,
  tripId,
  createdBy,
  text,
  rating,
}: RatingData) => {
  if (!ratingId)
    throw new Error("Tried to update a rating, using undefined id");
  await updateDoc(doc(db, "ratings", ratingId), {
    tripId,
    createdBy,
    text,
    rating,
    edited: Timestamp.fromDate(new Date()),
  });
};

export const deleteRating = async ({
  uid,
  tripId,
  ratingId,
}: {
  uid: string;
  tripId: string;
  ratingId: string;
}) => {
  await deleteDoc(doc(db, "ratings", ratingId));
  await updateDoc(doc(db, "users", uid), {
    ratings: arrayRemove({ tripId, ratingId }),
  });
};

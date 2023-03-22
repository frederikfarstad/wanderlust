import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getUid } from "../utils/FirebaseUtils";
import { db } from "./firebase-config";
import { RatingInterface, Trip, User } from "./Interfaces";

/* ############## TRIP FUNCTIONS ############## */

export const getAllTrips = async (): Promise<Trip[]> => {
  const tripsSnap = await getDocs(collection(db, "trips"));
  const tripData = tripsSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Trip[];
  return tripData;
};

export const getAllTripsByUserId = async (uid: string) => {
  const tripsRef = collection(db, "trips");
  const tripsQuery = query(tripsRef, where("createdBy", "==", uid));
  const tripsSnap = await getDocs(tripsQuery);
  const tripData = tripsSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Trip[];
  return tripData;
};

export const getAllFavoritedTripsFromUserId = async (uid: string) => {
  const userData = await getUserById(uid);
  const favorited = userData.favorited;
  return favorited === undefined ? [] : getTripsFromIdList(favorited);
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
  if (tripIds.length <= 0) return [];
  const q = query(collection(db, "trips"), where("__name__", "in", tripIds));
  const tripsSnap = await getDocs(q);
  const tripsData = tripsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Trip[];
  return tripsData;
}

const emptyTrip: Trip = {
  title: "",
  description: "",
  duration: "",
  price: "",
  locations: [],
  id: "",
  createdAt: Timestamp.fromDate(new Date()),
  edited: Timestamp.fromDate(new Date()),
  createdBy: "",
  numberOfRatings: 0,
  averageRating: 0,
  numberOfFavorites: 0,
};

export const getTripForEdit = async (tripId: string) => {
  if (tripId === "new") return emptyTrip;
  const tripSnap = await getDoc(doc(db, "trips", tripId));
  if (tripSnap.exists()) {
    return { ...tripSnap.data(), id: tripSnap.id } as Trip;
  } else {
    return emptyTrip;
  }
};

export const toggleFavorite = async ({
  uid,
  tripId,
  isFavorited,
}: {
  uid: string;
  tripId: string;
  isFavorited: boolean;
}) => {
  await updateDoc(doc(db, "users", uid), {
    favorited: isFavorited ? arrayRemove(tripId) : arrayUnion(tripId),
  });
  const change = isFavorited ? -1 : 1;
  await updateDoc(doc(db, "trips", tripId), {
    numberOfFavorites: increment(change),
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
  const tripSnap = await getDoc(doc(db, "trips", tripId));
  if (!tripSnap.exists())
    throw new Error("tried to fetch invalid trip while creating rating");
  const { averageRating: oldAvg, numberOfRatings: oldNumberOfRatings } =
    tripSnap.data();

  const newNumberOfRatings = oldNumberOfRatings + 1;
  const newAverageRating =
    (rating + oldNumberOfRatings * oldAvg) / newNumberOfRatings;

  /* Update the trip with new average rating and rating count */
  await updateDoc(doc(db, "trips", tripId), {
    averageRating: newAverageRating,
    numberOfRatings: newNumberOfRatings,
  });

  /* Create the rating in collection */
  console.log("creating");
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
  const tripSnap = await getDoc(doc(db, "trips", tripId));
  const ratingSnap = await getDoc(doc(db, "ratings", ratingId));

  if (!tripSnap.exists() || !ratingSnap.exists())
    throw new Error("tried to fetch invalid trip while creating rating");

  const { averageRating, numberOfRatings } = tripSnap.data();
  const { rating: oldRating } = ratingSnap.data();

  const newAverageRating =
    (averageRating * numberOfRatings - oldRating + rating) / numberOfRatings;

  /* Update the trip with new average rating */
  await updateDoc(doc(db, "trips", tripId), {
    averageRating: newAverageRating,
  });

  /* Update the rating with new info */
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
  rating,
}: {
  uid: string;
  tripId: string;
  ratingId: string;
  rating: number;
}) => {
  const tripSnap = await getDoc(doc(db, "trips", tripId));

  if (!tripSnap.exists())
    throw new Error("tried to fetch invalid trip while creating rating");

  const { averageRating: oldAvg, numberOfRatings: oldNumberOfRatings } =
    tripSnap.data();
  const newNumberOfRatings = oldNumberOfRatings - 1;

  const newAverageRating =
    newNumberOfRatings > 0
      ? (oldNumberOfRatings * oldAvg - rating) / newNumberOfRatings
      : 0;

  /* Update the trip with new average rating and rating count */
  await updateDoc(doc(db, "trips", tripId), {
    averageRating: newAverageRating,
    numberOfRatings: newNumberOfRatings,
  });

  await deleteDoc(doc(db, "ratings", ratingId));
  await updateDoc(doc(db, "users", uid), {
    ratings: arrayRemove({ tripId, ratingId }),
  });
};

export const setUserProfilePicture = async (uid: string, imageUrl: string) => {
  await updateDoc(doc(db, "users", uid), {
    profilepicture: imageUrl,
  });
};

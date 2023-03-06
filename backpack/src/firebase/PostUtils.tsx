import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { auth, db } from "./firebase-config";
import { Trip } from "../components/createTrip/interface";

export const getTripForEdit = async (tripId: string | undefined) => {
  if (!tripId || tripId === "new") {
    return null
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


// use addDoc to create a new trip with random id
export const createNewTrip = async (trip : Trip) => {
  const tripRef = collection(db, "trips")
  await addDoc(tripRef, {
    ...trip,
    createdBy: auth.currentUser?.uid,
    createdAt: Timestamp.fromDate(new Date()),
  })
}

// use setDoc to update existing 
export const updateExistingTrip = async (trip : Trip, tripId: string) => {
  const tripRef = doc(db, "trips", tripId)
  await updateDoc(tripRef, {
    ...trip,
    edited: Timestamp.fromDate(new Date())
  })
}


export const deleteTrip = async (tripId : string) => {
  await deleteDoc(doc(db, "trips", tripId))
}
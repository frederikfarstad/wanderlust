import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export interface User {
  uid: string;
  email: string;
  username: string;
  profilepicture: string;
  favorites: string[];
}

export const createUser = async (userInfo: User) => {
  await setDoc(doc(db, "users", userInfo.uid), {
    ...userInfo,
    createdAt: Timestamp.fromDate(new Date()),
  });
};

export const updateUser = async (uid: string) => {
  await updateDoc(doc(db, "users", uid), {
    lastLogin: Timestamp.fromDate(new Date()),
  });
};

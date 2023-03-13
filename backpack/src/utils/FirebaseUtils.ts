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
import { db, auth } from "../firebase/firebase-config";
import { Trip, User } from "../firebase/Interfaces";
import defaultpfp from "../public/pfp.png";

type SignupData = {
  email: string;
  username: string;
  fullname: string;
  password: string;
  repeatPassword: string;
};

export const getUid = () => {
  const uid = auth.currentUser?.uid
  if (!uid) throw new Error("cannot find uid")
  return uid
}

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
 * Makes it easy to query all trips made by a user.
 * We could avoid this: if we store a collection of all trips, and include the uid of the creator, this would not be necessary.
 *
 *
 *  */
/* 
export const postTrip = async (uid: string, post: Trip) => {
  await addDoc(collection(doc(db, "users", uid), "trips"), {
    ...post,
    createdAt: Timestamp.fromDate(new Date()),
  });
}; */

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




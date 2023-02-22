import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";

type SignupData = {
  email: string;
  username: string;
  fullname: string;
  password: string;
  repeatPassword: string;
};

const collectionRef = collection(db, "User");




/**
 * @returns boolean indicating success with signup
 * 
 * Whenever a user is registered with auth, we have to store it in the User collection in firebase.
 * This might cause problems when resetting password
 * 
 */
export const SubmitSignup = async (data: SignupData) => {
  const { email, username, fullname, password} = data;


  const success = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredentials) => {
      const user = userCredentials.user
      await updateProfile(user, {displayName : username})
      console.log("reading from auth")
      
      const docRef = doc(db, "User", user.uid);
      await setDoc(docRef, {
        username: username,
        email: email,
        fullname: fullname,
        profilePic: "",
        bio: "",
      });
      
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return success;
};

import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase";

type SignupData = {
  email?: string;
  username?: string;
  fullname?: string;
  password?: string;
  repeatPassword?: string;
};

/**
 * @returns boolean indicating success with signup
 */
export const SubmitSignup = async (data: SignupData) => {
  const { email, username, fullname, password, repeatPassword } = data;
  if (
    password !== repeatPassword ||
    email === undefined ||
    password === undefined
  )
    return false;

  const collectionRef = collection(db, "User");
  const q = query(collectionRef, where("username", "==", username));
  const docs = await getDocs(q);
  if (!docs.empty) {
    //Username is already in use
    alert("Username already in use!");
    return false;
  }
  const success = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredentials) => {
      const user = userCredentials.user;
      const docRef = doc(db, "User", user.uid);
      await setDoc(docRef, {
        username: username,
        fullname: fullname,
        profilePic: "",
        bio: "",
      });
      const snapshot = await getDoc(docRef);
      //   if (snapshot.exists()) {
      //     console.log(snapshot.id + " " + snapshot.data());
      //   }
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return success;
};

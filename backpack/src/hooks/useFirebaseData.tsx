import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  CollectionReference,
  QuerySnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

interface FirebaseData<T> {
  data: T[];
  loading: boolean;
  error?: Error;
}


// This is a hook for getting data from firebase. Can be used in general, by providing the string name of the collection.
// Define the interface for the datatype you want first.

/* Example usage:
interface User {
  id: string;
  username: string;
  email: string;
}
const { data: users, loading, error } = useFirebaseCollection<User>("users");

*/
function useFirebaseCollection<T>(
  path: string
): FirebaseData<T> {

    const dataRef = collection(db, path)

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const data = await getDocs(dataRef);
        const filteredData: { [field: string] : any}[] = data.docs.map((doc) => doc.data())
        setData(filteredData as T[]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export default useFirebaseCollection;

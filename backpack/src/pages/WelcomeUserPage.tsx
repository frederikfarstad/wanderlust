import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { SubmitButton } from "../components/Buttons";
import { getUserById } from "../firebase/asyncRequests";
import { getUid } from "../utils/FirebaseUtils";

export default function WelcomeUserPage() {
  const uid = getUid()

  const userQuery = useQuery({
    queryKey: ["users", uid],
    queryFn: () => getUserById(uid)
  })

  const username = userQuery.isSuccess ? userQuery.data.username : "to Wanderlust"
  
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <p className="text-3xl">
        Welcome {username}
      </p>
      <br />
      <p>Are you ready to start exploring the world?</p>
      <Link to="/" className="mt-10">
        <SubmitButton text="Go to main page" />
      </Link>
    </div>
  );
}

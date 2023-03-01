import { Link } from "react-router-dom";
import { SubmitButton } from "../components/Buttons";
import useUserInfo from "../hooks/useUserInfo";

export default function WelcomeUserPage() {
  const {username} = useUserInfo()
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <p className="text-3xl">
        Welcome {username ? username : "to Wanderlust"}
      </p>
      <br />
      <p>Are you ready to start exploring the world?</p>
      <Link to="/" className="mt-10">
        <SubmitButton text="Go to main page" />
      </Link>
    </div>
  );
}

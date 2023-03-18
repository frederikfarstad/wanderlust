import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { getUserById } from "../firebase/asyncRequests";
import { auth } from "../firebase/firebase-config";
import { User } from "../firebase/Interfaces";
import logo from "../public/mountain.png";
import { getUid } from "../utils/FirebaseUtils";

const cookies = new Cookies();
var isDarkMode: boolean = cookies.get("using_dark_mode") === "t" || false;

export default function Navbar() {
  const uid = getUid();

  const userQuery = useQuery({
    queryKey: ["users", uid],
    queryFn: () => getUserById(uid),
  });

  const isFirstRender = useRef(true);
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    SetDarkModeStyling(isDarkMode);
  });

  if (userQuery.isLoading)
    return (
      <>
        Loading user: {uid}...{" "}
        <button onClick={() => signOut(auth)}>Sign out</button>
      </>
    );
  if (userQuery.isError) return <>{JSON.stringify(userQuery.error)}</>;

  const pfp = userQuery.data.profilepicture;
  const profileLink = "profile/" + uid;

  return (
    <>
      <nav className="h-20 bg-primary-100 dark:bg-dark-100 border-gray-200 shadow-2xl w-full fixed z-10">
        <div className="grid grid-cols-6 h-full">
          <div className="col-start-2 flex items-center">
            <Link to="/" className="inline-flex p-2 my-2 rounded-md">
              <img src={logo} className="h-12 min-w-max" />
              <span className="text-xl font-semibold ml-2 hidden md:block self-center dark:text-dark-900">
                Wanderlust
              </span>
            </Link>
          </div>

          <div className="col-span-2">
            {/* Put the center items here. Could be something like filter or other stuff */}
          </div>

          <div className="flex items-center gap-4">
            <div className="group">
              <Link to={profileLink}>
                <img
                  className="h-8 min-w-max rounded-full bg-gray-500 ring-2 ring-gray-500 hover:ring-gray-900 hover:ring-4 transition-all"
                  src={pfp}
                  alt="user photo"
                />
              </Link>
              <div className="fixed top-20 :bg-primary-100 dark:bg-dark-100 border scale-x-100 scale-y-0 group-hover:scale-y-100 transition-all duration-300 origin-top-left">
                <div className="bg-primary-100 dark:bg-dark-100 grid grid-cols-1">
                  <Link to={profileLink}>
                    <div className="text-sm font-light dark:text-primary-details hover:bg-gray-300 p-4">
                      Go to profile
                    </div>
                  </Link>
                  <Link to="/settings">
                    <div className="text-sm font-light dark:text-primary-details hover:bg-gray-300 p-4">
                      Settings
                    </div>
                  </Link>
                  <Link to="/" className="">
                    <button
                      onClick={() => signOut(auth)}
                      className="text-sm font-light dark:text-primary-details hover:bg-gray-300 p-4 w-full text-left"
                    >
                      Log out
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/create/new">
              <div className="group">
                <IconAdd />
                <div className="fixed top-20 bg-primary-100 dark:bg-dark-100 border scale-x-100 scale-y-0 group-hover:scale-y-100 transition-all duration-300 origin-top">
                  <button className="text-sm font-light dark:text-primary-details hover:bg-gray-300 p-4">
                    Create route
                  </button>
                </div>
              </div>
            </Link>
            <button
              className="bg-primary-400 dark:bg-dark-400 hover:bg-primary-500 dark:hover:bg-dark-50 text-white font-bold py-1 px-2 rounded"
              onClick={ToggleDarkMode}
            >
              Dark mode
            </button>
          </div>
        </div>
      </nav>
      <div className="h-20 w-full bg-transparent" />
    </>
  );
}

function SetDarkModeStyling(val: boolean) {
  const element = document.body;
  if (val === true) {
    element.classList.add("dark");
  } else {
    element.classList.remove("dark");
  }
}

//function that toggles between light and dark mode
function ToggleDarkMode() {
  isDarkMode = !isDarkMode;
  SetDarkModeStyling(isDarkMode);
  cookies.set("using_dark_mode", isDarkMode ? "t" : "f");
}

function IconAdd() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      className="h-12 text-green-500 hover:bg-green-500 hover:text-primary-100 rounded-full hover:rotate-45 transition-all duration-100"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8a8 8 0 100 16 8 8 0 000-16z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13 7a1 1 0 10-2 0v4H7a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V7z"
        clipRule="evenodd"
      />
    </svg>
  );
}

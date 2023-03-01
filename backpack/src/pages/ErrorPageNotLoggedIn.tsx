import { Link } from "react-router-dom";

export default function ErrorPageNotLoggedIn() {
  return (
    <div className="flex items-center justify-center h-screen bg-primary-300">
      <div className="bg-primary-100 p-6 space-y-4 md:space-y-6 sm:p-8 rounded-xl flex flex-col justify-center">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
          Access Denied
        </h1>
        <p>This site requires you to be logged in to view</p>
        <Link to="/">

        <button className="text-white font-semibold drop-shadow-md rounded-md p-2 bg-primary-500 hover:bg-primary-600 w-full">Log in here</button>
        </Link>
      </div>
    </div>
  );
}

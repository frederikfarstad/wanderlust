import Post from "../components/Post";

import CreatePostButton from "../components/CreatePostButton";
import Navbar from "../components/Navbar";
import CreatePostForm from "../components/CreatePostForm";
import Footer from "../components/Footer";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

/* This should come from the database. Currently stored here in order to have something to display. */
const fakeData = [
  {
    username: "Jonas Gahr Støre",
    title: "Tur hjem til meg",
    start: "Stortinget",
    end: "Huset mitt",
    rating: 4.95,
  },
  {
    username: "Jonas Gahr Støre",
    title: "Fredagstur",
    start: "Oslo",
    end: "Bergen",
    rating: 0.23,
  },
  {
    username: "Jonas Gahr Støre",
    title: "Tilbake",
    start: "Bergen",
    end: "Oslo",
    rating: 1.12,
  },
  {
    username: "Jonas Gahr Støre",
    title: "...",
    start: "...",
    end: "...",
    rating: 5.0,
  },
];

export default function MainPage() {
  const posts = fakeData.map((d, i) => <Post key={i} {...d} />);
  return (
    <div className="flex flex-col justify-between bg-primary-300">
      <Navbar />
      <div className="grid grid-cols-3">
        {/* Left side of page */}
        <div>
          <div className="fixed top-20 left-5 group">
            <CreatePostButton />
            <div className="fixed top-40 left-5 scale-0 group-hover:scale-100 transition-all duration-700 origin-top-left">
              <CreatePostForm />
            </div>
          </div>
        </div>

        {/* Middle of page */}
        <div className="h-max flex flex-col items-center py-20">{posts}</div>

        {/* Right side of page */}
        <button onClick={() => signOut(auth)}>Temporary logout button for testing (pls fix)</button>
      </div>
      <Footer />
    </div>
  );
}

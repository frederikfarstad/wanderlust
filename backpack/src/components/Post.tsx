import { useState } from "react";
import jonas from "../public/jonas.jpg";

interface Props {
  username: string;
  title: string;
  start: string;
  end: string;
  rating: number;
}

export default function Post({ username, title, start, end, rating }: Props) {
  const [like, setLike] = useState("♡");

  return (
    <div className="grid grid-cols-10 gap-y-1 p-2 w-full shadow-xl hover:shadow-2xl hover:ring-1 ring-primary-900 bg-primary-200 min-w-[400px] mb-20 grid grid-rows-2 rounded-2xl">
      <img src={jonas} className="h-8 w-8 rounded-full" />
      <div className="col-span-5">
        <div className="text-sm font-bold">{username}</div>
        <div className="text-xs text-gray-800">Yesterday at 6:47 PM</div>
      </div>
      <div className="col-start-1 col-span-10 font-bold text-base uppercase">
        {title}
      </div>
      <div className="col-span-10 grid grid-rows-2">
        {" "}
        {
          "På tur gjennom Asia. Var innom Japan, Korea, Malaysia. Veldig fin tur! Sitter igjen med mange inntrykk<3" //koble på {description}  når ferdig
        }
      </div>

      <div className="text-2xl hover:text-3xl">
        <button onClick={() => setLike((prev) => (prev == "♡" ? "♥" : "♡"))}>
          {like}
        </button>
      </div>
      <div className="col-start-2 col-span-3 h-10"> Price: {"20 000kr"} </div>
      <div className="col-start-5 col-span-2 h-10"> Time: {"10d"}</div>
      <div className="col-start-7 col-span-4 h-10">
        <Rating rating={rating} />
      </div>
    </div>
  );
}

interface RatingProps {
  rating: number;
}

function Rating({ rating }: RatingProps) {
  return (
    <div className="flex items-center">
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Rating star</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
        {rating}
      </p>
      <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
      <a
        href="#"
        className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
      >
        73 reviews
      </a>
    </div>
  );
}

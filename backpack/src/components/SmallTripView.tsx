//import ruteNavn from rute
//import ruteBilde from bilde
import domen from "../assets/domen.jpeg";
import "../index.css";

type Entry = {
  title: string;
  description: string;
  avgRating: number;
};

interface SmallTripViewProps {
  entry: Entry;
}

function SmallTripView(props: SmallTripViewProps) {
  const { entry } = props;
  const { title, description, avgRating: rating } = entry;

  return (
    <div className="border-4 border-primary-200 grid grid-cols-5 bg-gradient-to-br from-primary-600 to-primary-400 rounded-3xl mb-[2vh] h-[200px]">
      <div className="rounded-l-[1.25rem] overflow-hidden h-full w-full col-span-2 border-r-4 border-primary-200 bg-gradient-to-l from-primary-600 via-inherit to-primary-600">
        <img
          src={domen}
          className="h-auto w-full m-auto hover:scale-150 transition-all ease-out duration-300"
        />{" "}
        {/* Rute bilde */}
      </div>
      <div className="relative text-white w-auto overflow-hidden col-span-3 p-2">
        <h1 className="border-b">{title}</h1> {/* Rute navn */}
        {/* Deler av koden under er hentet fra https://flowbite.com/docs/components/rating/ */}
        <div className="absolute top-[0.5rem] right-[1rem] flex items-center">
          <svg
            className={
              "w-5 h-5 " + (rating >= 1 ? "text-yellow-400" : "text-white")
            }
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>First star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            className={
              "w-5 h-5 " + (rating >= 2 ? "text-yellow-400" : "text-white")
            }
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Second star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            className={
              "w-5 h-5 " + (rating >= 3 ? "text-yellow-400" : "text-white")
            }
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Third star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            className={
              "w-5 h-5 " + (rating >= 4 ? "text-yellow-400" : "text-white")
            }
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fourth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            className={
              "w-5 h-5 " + (rating >= 5 ? "text-yellow-400" : "text-white")
            }
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fifth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <p className="ml-2 text-sm font-mono text-white">
            {rating.toString() + " out of 5"}
          </p>
        </div>
        <div className="h-[67.5%] overflow-scroll text-sm border-b scroll scrollbar-hide">
          <p>{description}</p> {/* Beskrivelse */}
        </div>
        <div className="flex justify-center mt-1 mb-1">
          <button className="border-2 border-white rounded-xl p-1 hover:bg-primary-300 transition-all ease-out duration-300">
            <p className="text-sm">VIS MER</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SmallTripView;

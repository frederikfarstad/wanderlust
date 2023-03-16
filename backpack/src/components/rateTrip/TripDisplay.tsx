import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getTripById, getUserById } from "../../firebase/asyncRequests";
import { getUid } from "../../utils/FirebaseUtils";
import { IconEdit, IconDelete } from "../createTrip/Icons";
import { ListElement } from "../Trip";

export default function TripDisplay() {
  const { tripId } = useParams();
  if (!tripId) throw new Error("navigated to invalid trip");
  const uid = getUid();

  const tripQuery = useQuery({
    queryKey: ["trips", tripId],
    queryFn: () => getTripById(tripId),
  });

  // TODO : fix this very cheeky hack. Here we send in uid when we don't know yet who made it
  const creatorQuery = useQuery({
    queryKey: ["users", tripQuery.data?.createdBy],
    queryFn: () => getUserById(tripQuery.data?.createdBy || uid),
    enabled: !!tripQuery.data?.createdBy,
  });

  if (!tripQuery.isSuccess || !creatorQuery.isSuccess)
    return <div>Loading ...</div>;

  const { username, profilepicture } = creatorQuery.data;
  const { title, price, duration, description, createdAt, edited, locations } =
    tripQuery.data;

  const locationElements = locations.map((l, i) => (
    <ListElement key={i} {...l} />
  ));

  return (
    <div className="border border-white rounded-t-xl p-4 relative group">
      <div className="flex flex-row items-center gap-4">
        <img src={profilepicture} className="w-12 h-12 rounded-full" />
        <div className="flex flex-col">
          <div className="font-semibold">{username}</div>
          <div className="flex flex-row items-center">
            <div className="font-light text-xs">
              {moment(createdAt.toDate()).fromNow()}
            </div>

            {edited !== undefined && (
              <>
                <div className="font-light text-xs mx-2">-</div>
                <div className="font-light text-xs">
                  edited {moment(edited.toDate()).fromNow()}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center font-bold text-3xl">
        {title}
      </div>
      <div className="flex justify-between">
        <ol className="relative border-l border-gray-700">
          {locationElements}
        </ol>
        <div className="flex flex-col">
          <div>Price: {price}</div>
          <div>Duration: {duration}</div>
        </div>
      </div>
      {description}

                <div className="flex flex-row items-center justify-center gap-20">
                    <div className="flex flex-row items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full group-hover:bg-sky-300 flex items-center justify-center">

                        <IconComment className="group-hover:bg-sky-300 bg-opacity-60" />
                        </div>
                        <div className="group-hover:text-sky-700">1</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <IconHeart />
                        <div>1</div>
                    </div>
                </div>




      <div className="absolute right-2 bottom-2 scale-0 group-hover:scale-100 flex flex-row gap-2">
        <button
        /*         onClick={() => setEditing(true)} */
        >
          <IconEdit />
        </button>
        <button
        /*           onClick={() => deleteRatingMutation.mutate({ uid, tripId, ratingId })} */
        >
          <IconDelete />
        </button>
      </div>
    </div>
  );
}

function IconComment({className} : {className:string}) {
    return (
      <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        height="1em"
        width="1em"
        className={className}
      >
        <path d="M256 32C114.6 32 .027 125.1.027 240c0 47.63 19.91 91.25 52.91 126.2-14.88 39.5-45.87 72.88-46.37 73.25-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25 28 9.05 60.2 14.25 92.9 14.25 141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zm.1 368c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29 7.375-12.12 14.37-25.75 19.88-40.25l10.62-28-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z" />
      </svg>
    );
  }

  function IconHeart() {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="1em"
        width="1em"
      >
        <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" />
      </svg>
    );
  }
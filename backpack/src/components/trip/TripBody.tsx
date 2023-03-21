import { Location } from "../../firebase/Interfaces";
import { ListElement } from "./LocationListElement";

interface TripBodyProps {
  title: string;
  locations: Location[];
  price: string;
  duration: string;
  description: string;
}

export default function TripBody({
  title,
  locations,
  price,
  duration,
  description,
}: TripBodyProps) {
  const locationElements = locations.map((l, i) => (
    <ListElement key={i} {...l} />
  ));

  return (
    <div>
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
    </div>
  );
}

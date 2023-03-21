import { Location } from "../../firebase/Interfaces";

export function ListElement({ country, province, area }: Location) {
  return (
    <li className="mb-6 ml-4">
      <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -left-1.5 border border-white"></div>
      <h3 className=" text-xs font-semibold text-gray-900 dark:text-dark-900">
        {country}
      </h3>
      <p className="mb-4 text-xs  font-normal text-gray-500 dark:text-dark-900">
        {province}, {area}
      </p>
    </li>
  );
}


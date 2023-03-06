import { useState } from "react";
import { Location } from "./interface";

interface EditProps {
  location: Location | null;
  goBack: (e: any, location : Location | null) => void;
}

export default function EditMode({ location, goBack }: EditProps) {
  const [country, setCountry] = useState(location?.country || "");
  const [province, setProvince] = useState(location?.province || "");
  const [area, setArea] = useState(location?.area || "");

  const newLocation = {country, province, area} as Location

  return (
    <div className="border-2 border-black p-4 rounded-xl">
      <div className="grid grid-cols-3 gap-2">
        <label>
          Country
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Province
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </label>
        <label>
          Area
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </label>
        <div className="col-span-3 flex justify-between">
        <button disabled={area === ""} onClick={e => goBack(e, newLocation)}><IconCheck /></button>
        <button onClick={e => goBack(e, location)}><IconDelete /></button>
      </div>
      </div>
    </div>
  );
}

function IconDelete() {
  return (
    <svg
      baseProfile="tiny"
      viewBox="0 0 24 24"
      fill="currentColor"
      height="2em"
      width="2em"
      className="text-red-500 hover:border rounded-full border-gray-500"
    >
      <path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293a.999.999 0 11-1.414 1.414L12 13.414l-2.293 2.293a.997.997 0 01-1.414 0 .999.999 0 010-1.414L10.586 12 8.293 9.707a.999.999 0 111.414-1.414L12 10.586l2.293-2.293a.999.999 0 111.414 1.414L13.414 12l2.293 2.293z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg className="text-green-500 hover:border rounded-full border-gray-500" viewBox="0 0 1024 1024" fill="currentColor" height="2em" width="2em">
      <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
    </svg>
  );
}


import { Country } from "../types";
import { SubmitButton } from "./Buttons";

type LocationListElementProps = {
  country: Country;
  province: string;
  area: string;
};

export const LocationListElement = (props: LocationListElementProps) => {
  const { country, province, area } = props;
  return (
    <div className="bg-primary-50 drop-shadow-md rounded-md text-center text-sm flex justify-between px-5 py-2">
      <div className="text-left">
        <p>{country}</p>
        <p>
          {area}, {province}
        </p>
      </div>
      <SubmitButton text="X" />
    </div>
  );
};

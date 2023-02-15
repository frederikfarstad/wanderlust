import { Country } from "../types";

type LocationListElementProps = {
  country: Country;
  province: string;
  area: string;
};

export const LocationListElement = (props: LocationListElementProps) => {
  const { country, province, area } = props;
  return (
    <div className="bg-primary-50 drop-shadow-md rounded-md text-center text-sm font-mono ">
      <p>{country}</p>
      <p>{province}</p>
      <p>{area}</p>
    </div>
  );
};

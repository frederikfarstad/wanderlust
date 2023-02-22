import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { SubmitButton } from "../components/Buttons";
import { LocationListElement } from "../components/ListElements";
import { db } from "../firebase";
import { Country, TravelLocation } from "../types";
import { countries, isCountry } from "../utils/Validation";

const AddLocationSection = ({
  locations,
  setLocations,
  setSection,
}: {
  locations: TravelLocation[];
  setLocations: any;
  setSection: any;
}) => {
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [area, setArea] = useState("");

  const onLocationSubmitted = async () => {
    if (country === "") return false;
    const confirmedCountry = country as Country;

    const location = {
      country: confirmedCountry,
      province,
      area,
    };
    const newLocations = [...locations];
    newLocations.push(location);
    setLocations(newLocations);
    setSection("route");
    return true;
  };

  return (
    <div className="bg-primary-100 rounded-md">
      <div className="flex justify-center p-5">
        <p className="text-2xl text-primary-800 font-mono">
          Add Location to Your Route
        </p>
      </div>
      <div className="flex justify-center">
        <div className="flex">
          <div className="space-y-4 mr-5 font-mono">
            <p>Country</p>
            <p>Province</p>
            <p>Area</p>
          </div>
          <div className="space-y-3">
            <div>
              <select
                className="rounded-md shadow-inner border-2 border-slate-600 font-mono"
                name="country"
                placeholder="Enter country"
                onChange={(event) => setCountry(event.target.value)}
              >
                {countries.map((c: string) => (
                  <option value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <input
                className="rounded-md shadow-inner border-2 border-slate-600 font-mono"
                type="text"
                name="province"
                placeholder="Enter province"
                value={province}
                onChange={(event) => setProvince(event.target.value)}
              />
            </div>
            <div>
              <input
                className="rounded-md shadow-inner border-2 border-slate-600 font-mono"
                type="text"
                name="area"
                placeholder="Enter area"
                value={area}
                onChange={(event) => setArea(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-3">
        <SubmitButton text="OK" submitFunction={onLocationSubmitted} />
      </div>
    </div>
  );
};

const CreateRouteSection = ({
  title,
  setTitle,
  description,
  setDescription,
  duration,
  setDuration,
  price,
  setPrice,
  setSection,
  locations,
}: any) => {
  const onCreateRouteSubmitted = async () => {
    try {
      await addDoc(collection(db, "Routes"), {
        title: title,
        description: description,
        price: price,
        duration: duration,
        locations: locations,
      });
      return true;
    } catch (err) {
      console.error("Error when trying to create route:", err);
      return false;
    }
  };

  return (
    <div className="bg-primary-100 rounded-md">
      <div className="flex justify-center p-5">
        <p className="text-4xl text-primary-800">Create Route</p>
      </div>
      <div className="flex px-2">
        <div className="flex">
          <div className="flex">
            <div className="space-y-4 mr-2">
              <p>Title</p>
              <p>Description</p>
              <p>Price</p>
              <p>Time</p>
            </div>
            <div className="space-y-3">
              <div>
                <input
                  className="rounded-md shadow-inner border-2 border-slate-600"
                  type="text"
                  name="title"
                  placeholder="Title here"
                  onChange={(event) => setTitle(event.target.value)}
                  value={title}
                />
              </div>
              <div>
                <input
                  className="rounded-md shadow-inner border-2 border-slate-600"
                  type="text"
                  name="description"
                  placeholder="Description here"
                  onChange={(event) => setDescription(event.target.value)}
                  value={description}
                />
              </div>
              <div>
                <input
                  className="rounded-md shadow-inner border-2 border-slate-600"
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  onChange={(event) => setPrice(event.target.value)}
                  value={price}
                />
              </div>
              <div>
                <input
                  className="rounded-md shadow-inner border-2 border-slate-600"
                  type="text"
                  name="duration"
                  placeholder="How long?"
                  onChange={(event) => setDuration(event.target.value)}
                  value={duration}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-1 max-h-36 space-y-2 ml-3 border-2 border-slate-600 flex flex-col w-72">
          <p className="text-center text-xl border-b-2 border-slate-600">
            Locations
          </p>
          <div className="overflow-y-scroll flex-1 space-y-2">
            {locations !== undefined &&
              locations.map((location: TravelLocation) => (
                <LocationListElement {...location} />
              ))}
          </div>
          <div className="flex justify-center border-t-2 border-slate-600 p-2">
            <SubmitButton
              text="Add location"
              submitFunction={async () => {
                setSection("location");
                return true;
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center py-4">
        <div className="flex px-4">
          <SubmitButton text="OK" submitFunction={onCreateRouteSubmitted} />
        </div>
      </div>
    </div>
  );
};

const CreateRoutePage = () => {
  const [section, setSection] = useState<"route" | "location">("route");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState("");
  const [locations, setLocations] = useState<TravelLocation[]>([]);

  return (
    <div className="bg-gradient-to-b from-primary-200 to-primary-900 flex h-screen justify-center items-center">
      {section === "route" ? (
        <CreateRouteSection
          title={title}
          description={description}
          price={price}
          duration={duration}
          locations={locations}
          setTitle={setTitle}
          setDescription={setDescription}
          setDuration={setDuration}
          setPrice={setPrice}
          setSection={setSection}
        />
      ) : (
        <AddLocationSection
          locations={locations}
          setLocations={setLocations}
          setSection={setSection}
        />
      )}
    </div>
  );
};

export default CreateRoutePage;

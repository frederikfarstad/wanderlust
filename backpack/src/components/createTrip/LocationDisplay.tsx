import { useEffect, useState } from "react";
import EditMode from "./EditMode";
import { IconAdd, IconDelete, IconEdit } from "./Icons";
import { Location } from "../../firebase/Interfaces";

interface LocationDsiplayProps {
  locations: Location[];
  handleAddLocation: (locations: Location[]) => void;
}

// The full location list is stored in the parent component.
// Whenever we leave edit mode, we give back an updated version
export default function LocationDisplay({
  locations,
  handleAddLocation,
}: LocationDsiplayProps) {

  useEffect(() => {
    setTopLocations(locations);
  }, [locations]);

  const [editmode, setEditmode] = useState(false);
  const [editItem, setEditItem] = useState<Location | null>(null);
  const [topLocations, setTopLocations] = useState<Location[]>(locations);
  const [bottomLocations, setBottomLocations] = useState<Location[]>([]);


  const enterEditmode = (e: any, index: number, insert: boolean) => {
    setEditItem(insert ? null : topLocations[index]);
    setTopLocations(topLocations.slice(0, index));
    setBottomLocations(topLocations.slice(insert ? index : index + 1));
    setEditmode(true);
  };

  const leaveEditmode = (e: any, location : Location | null) => {
    const combined = location ? [...topLocations, location, ...bottomLocations] : [...topLocations, ...bottomLocations]
    handleAddLocation(combined)
    setTopLocations(combined);
    setBottomLocations([])
    setEditmode(false)
  }

  const deleteItem = (e: any, index: number) => {
    const combined = topLocations.filter((_, i) => i !== index)
    handleAddLocation(combined)
    setTopLocations(combined)
  }

  return <div className="p-4 rounded-xl">
    <OrderedList {...{ locations: topLocations, enterEditmode, deleteItem }} />

    {editmode ? <EditMode location={editItem} goBack={leaveEditmode} /> : <></>}
    <OrderedList {...{ locations: bottomLocations, enterEditmode, deleteItem }} />
    <button
      className="w-full flex justify-center"
      onClick={(e) => enterEditmode(e, topLocations.length, true)}
      disabled={editmode}
    >
      <IconAdd className="text-green-300 bg-gray-700 rounded-full w-8 h-8" />
    </button>
  </div>

}

interface ListProps {
    locations: Location[];
    enterEditmode: (e: any, index: number, insert: boolean) => void;
    deleteItem: (e: any, index: number) => void;
  }
  
  /**
   * Creates a list of all the stops. Has a bulletpoint, and some stuff.
   * */
  function OrderedList({ locations, enterEditmode, deleteItem }: ListProps) {
    const listElements = locations
      ?.filter((i) => i)
      .map((location, index) => (
        <li key={index} className="h-20 ml-4 group flex justify-between items-center">
          <div >

        <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -left-1.5 border border-white"></div>
        <h3 className="text-lg font-semibold text-gray-900">{location.country}</h3>
        <p className="mb-4 text-base font-normal text-gray-500">
          {location.province}, {location.area}
        </p>
          </div>
          <div className="flex flex-row scale-0 group-hover:scale-100">
            <button onClick={(e) => enterEditmode(e, index, false)}><IconEdit /></button>
            <button onClick={(e) => deleteItem(e, index)}><IconDelete /></button>
          </div>
      </li>
      ));
  
    return <ol className="relative border-l border-gray-400">{listElements}</ol>;
  }
  
import { SubmitButton } from "../components/Buttons";
import { LocationListElement } from "../components/ListElements";

const CreateRoutePage = () => {
  return (
    <div className="bg-gradient-to-b from-primary-200 to-primary-900 flex h-screen justify-center items-center">
      <div className="bg-primary-100 rounded-md">
        <div className="flex justify-center p-5">
          <p className="text-4xl text-primary-800 font-mono">Create Route</p>
        </div>
        <div className="flex px-2">
          <div className="flex">
            <div className="flex">
              <div className="space-y-4 mr-2 font-mono">
                <p>Title</p>
                <p>Description</p>
                <p>Price</p>
                <p>Time</p>
              </div>
              <div className="space-y-3">
                <div>
                  <input
                    className="rounded-md shadow-inner border-2 border-slate-600 font-mono"
                    type="text"
                    name="title"
                    placeholder="Title here"
                  />
                </div>
                <div>
                  <input
                    className="rounded-md shadow-inner border-2 border-slate-600 font-mono"
                    type="text"
                    name="description"
                    placeholder="Description here"
                  />
                </div>
                <div>
                  <input
                    className="rounded-md shadow-inner border-2 border-slate-600 font-mono"
                    type="number"
                    name="price"
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <input
                    className="rounded-md shadow-inner border-2 border-slate-600 font-mono"
                    type="text"
                    name="time"
                    placeholder="How long?"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-40 bg-blue-500 p-1 overflow-y-scroll overflow-hidden max-h-36 border-2 border-slate-600 space-y-2 ml-3 rounded-md">
            <LocationListElement
              country="Norway"
              province="Trøndelag"
              area="Gløshaugen"
            />
            <LocationListElement
              country="Germany"
              province="Bayern"
              area="Allianz Arena"
            />
            <LocationListElement
              country="Australia"
              province="Queensland"
              area="The beach"
            />
          </div>
        </div>
        <div className="flex justify-center py-4">
          <div className="flex px-4">
            <SubmitButton text="OK" />
          </div>
          <div>
            <SubmitButton text="Add Location" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoutePage;

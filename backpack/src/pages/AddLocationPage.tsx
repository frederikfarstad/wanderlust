import { SubmitButton } from "../components/Buttons";

const AddLocationPage = () => {
  return (
    <div className="bg-gradient-to-b from-primary-200 to-primary-900 flex h-screen justify-center items-center">
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
                <input
                  className="rounded-md shadow-inner border-2 border-slate-600 font-mono"
                  type="country"
                  name="country"
                  placeholder="Enter country"
                />
              </div>
              <div>
                <input
                  className="rounded-md shadow-inner border-2 border-slate-600 font-mono"
                  type="text"
                  name="province"
                  placeholder="Enter province"
                />
              </div>
              <div>
                <input
                  className="rounded-md shadow-inner border-2 border-slate-600 font-mono"
                  type="text"
                  name="area"
                  placeholder="Enter area"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-3">
          <SubmitButton text="OK" />
        </div>
      </div>
    </div>
  );
};

export default AddLocationPage;

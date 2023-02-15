export default function CreatePostForm() {
  return (
    <section className="bg-primary-100 w-90">
      <div className="py-8 px-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Create a new post
        </h2>

        <form>
          <div className="grid grid-cols-2 grid-gap-4">
            <div className="col-span-2">
              <label htmlFor="title">Route Name</label>
              <input
                name="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type post title"
              />
            </div>

            <div className="w-full">
              <label htmlFor="start">Start</label>
              <input
                name="start"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type trip start"
              />
            </div>
            <div className="w-full">
              <label htmlFor="end">End</label>
              <input
                name="end"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type trip end"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
            >
              Post!
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

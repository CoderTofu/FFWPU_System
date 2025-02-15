export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div>
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
          ADMIN LOGIN
        </h1>
        <div className="bg-white py-14 px-10 rounded-lg shadow-2xl min-w-[500px] ">
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Username:
              </label>
              <input
                type="text"
                className="w-full mt-2 text-sm p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter username"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                className="w-full mt-2 text-sm p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

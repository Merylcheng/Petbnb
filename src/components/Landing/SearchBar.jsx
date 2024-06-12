import { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [sitters, setSitters] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/sitters?location=${location}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSitters(data);
    } catch (error) {
      console.error("Error fetching sitters:", error.message);
    }
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-screen-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center border-b border-gray-400 pb-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-3 leading-tight focus:outline-none"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Find sitters near you"
          />
          <button
            className="bg-indigo-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <ul className="mt-4">
          {sitters.map((sitter) => (
            <li key={sitter._id} className="border-b border-gray-200 py-3">
              <div className="text-lg font-semibold text-gray-900">
                {sitter.name}
              </div>
              <div className="text-gray-600">{sitter.location}</div>
              <Link
                to={`/sitters/${sitter._id}`}
                className="text-indigo-500 hover:text-blue-600"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;

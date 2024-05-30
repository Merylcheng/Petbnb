import { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
  const [area, setArea] = useState("");
  const [hdbType, setHdbType] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate postal code if provided
    if (postalCode && postalCode.length !== 6) {
      alert("Postal code must be exactly 6 digits.");
      return;
    }

    try {
      const response = await fetch(
        `/api/properties/search?area=${area}&hdbType=${hdbType}&postalCode=${postalCode}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error occurred while searching:", error);
    }
  };

  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    // Allow only numeric values and limit to 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setPostalCode(value);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4"
      >
        <div className="flex flex-col w-full md:w-1/3">
          <label htmlFor="area" className="text-gray-700 font-semibold mb-1">
            Area:
          </label>
          <select
            name="area"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Area</option>
            <option value="Pasir Ris">Pasir Ris</option>
            <option value="Serangoon">Serangoon</option>
            <option value="Tampines">Tampines</option>
            <option value="Bedok">Bedok</option>
            <option value="Clementi">Clementi</option>
            <option value="Punggol">Punggol</option>
            <option value="Jurong East">Jurong East</option>
          </select>
        </div>

        <div className="flex flex-col w-full md:w-1/3">
          <label htmlFor="hdbType" className="text-gray-700 font-semibold mb-1">
            HDB Type:
          </label>
          <select
            name="hdbType"
            id="hdbType"
            value={hdbType}
            onChange={(e) => setHdbType(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select HDB Type</option>
            <option value="3-room">3-room</option>
            <option value="4-room">4-room</option>
            <option value="5-room">5-room</option>
          </select>
        </div>

        <div className="flex flex-col w-full md:w-1/3">
          <label
            htmlFor="postalCode"
            className="text-gray-700 font-semibold mb-1"
          >
            Postal Code:
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="e.g 520123"
            value={postalCode}
            onChange={handlePostalCodeChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
        >
          Search
        </button>
      </form>

      <div className="mt-8">
        <ul className="space-y-4">
          {searchResults.map((property) => (
            <li
              key={property._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                <img
                  src={property.imageUrl}
                  alt={`Image of ${property.address}`}
                  className="w-32 h-32 object-cover rounded mr-4"
                />
                <div>
                  <p className="text-gray-700 mb-2">
                    {property.address}, {property.area}, {property.postalCode},
                    {property.hdbType}
                  </p>
                  <Link
                    to={`/property/${property._id}`}
                    className="inline-block mt-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;

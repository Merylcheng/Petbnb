import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Featured() {
  const [sitters, setSitters] = useState([]);

  useEffect(() => {
    const fetchSitters = async () => {
      try {
        const response = await fetch("/api/sitters");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSitters(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchSitters();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-indigo-600 text-center mb-8">
        Featured Sitters
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sitters.map((sitter) => (
          <div
            key={sitter._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {sitter.imageUrl && (
              <img
                src={sitter.imageUrl}
                alt={sitter.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{sitter.title}</h2>
              <p className="text-xl font-bold mb-2">{sitter.name}</p>
              <p className="text-gray-700 mb-2">{sitter.location}</p>
              <p className="text-gray-700 mb-2">{sitter.bio}</p>
              <p className="text-gray-700 mb-2">{sitter.experience}</p>
              <p className="text-gray-700 mb-2">Charges: ${sitter.charges}</p>
              <p className="text-gray-700 mb-2">Pet: {sitter.pet}</p>
              <p className="text-gray-700 mb-2">Pet Size: {sitter.petSize}</p>
              <Link to={`/sitters/${sitter._id}`}>
                <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Featured;

{
  /* <p className="text-lg font-semibold text-gray-700 mb-2">
{sitter.name} */
}

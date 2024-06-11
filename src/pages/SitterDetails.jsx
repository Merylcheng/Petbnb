// import { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";

// const SitterDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [sitter, setSitter] = useState(null);

//   useEffect(() => {
//     const fetchSitter = async () => {
//       try {
//         const response = await fetch(`/api/sitters/${id}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setSitter({ data, error: null });
//       } catch (error) {
//         setSitter({ data: null, error: error.message });
//       }
//     };

//     fetchSitter();
//   }, [id]);

//   if (sitter === null) {
//     return <div>Loading...</div>;
//   }

//   if (sitter.error) {
//     return <div>Error: {sitter.error}</div>;
//   }

//   if (!sitter.data) {
//     return <div>No sitter found</div>;
//   }

//   const handleBookServices = () => {
//     navigate(`/calendar?sitterId=${id}`);
//   };

//   return (
//     <div>
//       <h1>{sitter.data.name}</h1>
//       <img src={sitter.data.imageUrl} alt={sitter.data.name} />
//       <p>
//         <strong>Title:</strong> {sitter.data.title}
//       </p>
//       <p>
//         <strong>Location:</strong> {sitter.data.location}
//       </p>
//       <p>
//         <strong>Bio:</strong> {sitter.data.bio}
//       </p>
//       <p>
//         <strong>Experience:</strong> {sitter.data.experience}
//       </p>
//       <p>
//         <strong>Charges:</strong> ${sitter.data.charges}
//       </p>
//       <p>
//         <strong>Pet:</strong> {sitter.data.pet}
//       </p>
//       <p>
//         <strong>Pet Size:</strong> {sitter.data.petSize}
//       </p>
//       <br />
//       <button onClick={handleBookServices}>Book Services Here!</button>
//       <br />
//       <Link to={`/messages/${id}`}>
//         <button>Contact us here!</button>
//       </Link>
//     </div>
//   );
// };

// export default SitterDetails;

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const SitterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sitter, setSitter] = useState(null);

  useEffect(() => {
    const fetchSitter = async () => {
      try {
        const response = await fetch(`/api/sitters/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSitter({ data, error: null });
      } catch (error) {
        setSitter({ data: null, error: error.message });
      }
    };

    fetchSitter();
  }, [id]);

  if (sitter === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (sitter.error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error: {sitter.error}
      </div>
    );
  }

  if (!sitter.data) {
    return (
      <div className="flex items-center justify-center h-screen">
        No sitter found
      </div>
    );
  }

  const handleBookServices = () => {
    navigate(`/calendar?sitterId=${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4">
        {sitter.data.name}
      </h1>
      <div className="flex justify-center mb-4">
        <img
          className="rounded-full w-100 h-100 object-cover"
          src={sitter.data.imageUrl}
          alt={sitter.data.name}
        />
      </div>
      <div className="space-y-2">
        <p>
          <strong className="font-semibold">Location:</strong>{" "}
          {sitter.data.location}
        </p>
        <p>
          <strong className="font-semibold">Bio:</strong> {sitter.data.bio}
        </p>
        <p>
          <strong className="font-semibold">Experience:</strong>{" "}
          {sitter.data.experience}
        </p>
        <p>
          <strong className="font-semibold">Charges:</strong> $
          {sitter.data.charges}
        </p>
        <p>
          <strong className="font-semibold">Pet:</strong> {sitter.data.pet}
        </p>
        <p>
          <strong className="font-semibold">Pet Size:</strong>{" "}
          {sitter.data.petSize}
        </p>
      </div>
      <div className="mt-6 space-y-4">
        <button
          onClick={handleBookServices}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Book Services Here!
        </button>
        <Link to={`/messages/${id}`}>
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none">
            Contact us here!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SitterDetails;

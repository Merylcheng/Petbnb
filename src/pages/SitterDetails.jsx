import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SitterDetails = () => {
  const { id } = useParams();
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
    return <div>Loading...</div>;
  }

  if (sitter.error) {
    return <div>Error: {sitter.error}</div>;
  }

  if (!sitter.data) {
    return <div>No sitter found</div>;
  }

  return (
    <div>
      <h1>{sitter.data.name}</h1>
      <img src={sitter.data.imageUrl} alt={sitter.data.name} />
      <p>
        <strong>Title:</strong> {sitter.data.title}
      </p>
      <p>
        <strong>Location:</strong> {sitter.data.location}
      </p>
      <p>
        <strong>Bio:</strong> {sitter.data.bio}
      </p>
      <p>
        <strong>Experience:</strong> {sitter.data.experience}
      </p>
      <p>
        <strong>Charges:</strong> ${sitter.data.charges}
      </p>
      <p>
        <strong>Pet:</strong> {sitter.data.pet}
      </p>
      <p>
        <strong>Pet Size:</strong> {sitter.data.petSize}
      </p>
      <br />
      <Link to="/calendar">
        <button>Book Services Here!</button>
      </Link>
      <br />
      <Link to="/messages/:receiverId">
        <button>Contact us here!</button>
      </Link>
    </div>
  );
};

export default SitterDetails;

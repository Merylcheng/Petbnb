import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SitterDetails = () => {
  const { id } = useParams();
  const [sitter, setSitter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSitter = async () => {
      try {
        const response = await fetch(`/api/sitters/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSitter(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSitter();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!sitter) {
    return <div>No sitter found</div>;
  }

  return (
    <div>
      <h1>{sitter.name}</h1>
      <img src={sitter.imageUrl} alt={sitter.name} />
      <p>
        <strong>Title:</strong> {sitter.title}
      </p>
      <p>
        <strong>Location:</strong> {sitter.location}
      </p>
      <p>
        <strong>Bio:</strong> {sitter.bio}
      </p>
      <p>
        <strong>Experience:</strong> {sitter.experience}
      </p>
      <p>
        <strong>Charges:</strong> ${sitter.charges}
      </p>
      <p>
        <strong>Pet:</strong> {sitter.pet}
      </p>
      <p>
        <strong>Pet Size:</strong> {sitter.petSize}
      </p>
    </div>
  );
};

export default SitterDetails;

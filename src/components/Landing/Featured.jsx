import { useEffect, useState } from "react";

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
    <div>
      <h1>Featured Sitters</h1>
      <ul>
        {sitters.map((sitter) => (
          <li key={sitter._id}>
            <h2>{sitter.title}</h2>
            <p>{sitter.name}</p>
            <p>{sitter.location}</p>
            <p>{sitter.bio}</p>
            <p>{sitter.experience}</p>
            <p>Charges: ${sitter.charges}</p>
            <p>Pet: {sitter.pet}</p>
            <p>Pet Size: {sitter.petSize}</p>
            {sitter.imageUrl && <img src={sitter.imageUrl} alt={sitter.name} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Featured;

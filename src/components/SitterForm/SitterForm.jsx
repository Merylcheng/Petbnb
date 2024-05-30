import { useState } from "react";

const SitterForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    location: "",
    bio: "",
    experience: "",
    charges: "",
    pet: "",
    petSize: "Small", // Default to 'Small'
    // Uncomment if imageUrl is necessary
    // imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sitters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Sitter created:", data);
      // Handle successful creation (e.g., redirect, display message, etc.)
    } catch (error) {
      console.error("Error creating sitter:", error.message);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Bio:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div>
        <label>Experience:</label>
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Charges:</label>
        <input
          type="number"
          name="charges"
          value={formData.charges}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Pet:</label>
        <input
          type="text"
          name="pet"
          value={formData.pet}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Pet Size:</label>
        <select
          name="petSize"
          value={formData.petSize}
          onChange={handleChange}
          required
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      {/* Uncomment if imageUrl is necessary */}
      {/* <div>
        <label>Image URL:</label>
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
      </div> */}
      <button type="submit">Create Sitter</button>
    </form>
  );
};

export default SitterForm;

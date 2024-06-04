import { useState } from "react";

const SitterProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact: "",
    bio: "",
    experience: "",
    charges: "",
    pet: [],
    petSize: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e, key) => {
    const { value, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [key]: checked
        ? [...prevState[key], value]
        : prevState[key].filter((item) => item !== value),
    }));
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      if (key === "pet" || key === "petSize") {
        formData[key].forEach((item) => form.append(key, item));
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("/api/sitters", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Sitter created:", data);
    } catch (error) {
      console.error("Error creating sitter:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label>Contact:</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
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
        <div>
          <label>
            <input
              type="checkbox"
              value="Dog"
              checked={formData.pet.includes("Dog")}
              onChange={(e) => handleCheckboxChange(e, "pet")}
            />
            Dog
          </label>
          <label>
            <input
              type="checkbox"
              value="Cat"
              checked={formData.pet.includes("Cat")}
              onChange={(e) => handleCheckboxChange(e, "pet")}
            />
            Cat
          </label>
          <label>
            <input
              type="checkbox"
              value="Small Animals"
              checked={formData.pet.includes("Small Animals")}
              onChange={(e) => handleCheckboxChange(e, "pet")}
            />
            Small Animals
          </label>
        </div>
      </div>
      <div>
        <label>Pet Size:</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="Small"
              checked={formData.petSize.includes("Small")}
              onChange={(e) => handleCheckboxChange(e, "petSize")}
            />
            Small
          </label>
          <label>
            <input
              type="checkbox"
              value="Medium"
              checked={formData.petSize.includes("Medium")}
              onChange={(e) => handleCheckboxChange(e, "petSize")}
            />
            Medium
          </label>
          <label>
            <input
              type="checkbox"
              value="Large"
              checked={formData.petSize.includes("Large")}
              onChange={(e) => handleCheckboxChange(e, "petSize")}
            />
            Large
          </label>
        </div>
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleImageChange} required />
      </div>
      <button type="submit">Create Sitter</button>
    </form>
  );
};

export default SitterProfileForm;
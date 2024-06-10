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
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Contact:</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Bio:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Experience:
        </label>
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Charges:</label>
        <input
          type="number"
          name="charges"
          value={formData.charges}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Pet:</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Dog"
              checked={formData.pet.includes("Dog")}
              onChange={(e) => handleCheckboxChange(e, "pet")}
              className="mr-2"
            />
            Dog
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Cat"
              checked={formData.pet.includes("Cat")}
              onChange={(e) => handleCheckboxChange(e, "pet")}
              className="mr-2"
            />
            Cat
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Small Animals"
              checked={formData.pet.includes("Small Animals")}
              onChange={(e) => handleCheckboxChange(e, "pet")}
              className="mr-2"
            />
            Small Animals
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Pet Size:</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Small"
              checked={formData.petSize.includes("Small")}
              onChange={(e) => handleCheckboxChange(e, "petSize")}
              className="mr-2"
            />
            Small
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Medium"
              checked={formData.petSize.includes("Medium")}
              onChange={(e) => handleCheckboxChange(e, "petSize")}
              className="mr-2"
            />
            Medium
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Large"
              checked={formData.petSize.includes("Large")}
              onChange={(e) => handleCheckboxChange(e, "petSize")}
              className="mr-2"
            />
            Large
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          required
          className="w-full"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-500 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
      >
        Create Profile
      </button>
    </form>
  );
};

export default SitterProfileForm;

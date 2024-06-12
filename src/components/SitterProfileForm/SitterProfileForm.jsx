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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setLoading(true);
    setSuccess(false);

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
      setSuccess(true);
    } catch (error) {
      console.error("Error creating sitter:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/images/pet4.jpg')` }}
    >
      <div
        className="bg-indigo-600 text-white py-4 px-4 rounded-t-lg"
        style={{ width: "800px" }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Your Profile</h1>
        <p className="text-gray-300 text-center mb-6">
          Fill in your profile and describe yourself.
        </p>
        {success && (
          <p className="text-xl text-green-300 text-center mb-4">
            Profile created successfully!
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 bg-white shadow-md rounded-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Your listing name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="John's Pet Paradise"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 text-gray-700 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Location:
            </label>
            <input
              type="text"
              name="location"
              placeholder="Tampines"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full text-gray-700 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Contact:
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full p-2 text-gray-700 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Share more about yourself and services provided"
              required
              className="w-full p-2 text-gray-700 border border-gray-300 rounded-md"
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
              className="w-full p-2 text-gray-700 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Charges:
            </label>
            <input
              type="number"
              name="charges"
              value={formData.charges}
              onChange={handleChange}
              required
              className="w-full p-2 text-gray-700 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Pet:</label>
            <div className="space-y-2 text-gray-700">
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
            <label className="block text-gray-700 font-bold mb-2">
              Pet Size:
            </label>
            <div className="space-y-2 text-gray-700">
              <label className="flex items-center ">
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
              className="w-full text-gray-700 "
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading
              ? "wow very chio! please be patient while we work hard to admire your profile.. i meant create "
              : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SitterProfileForm;

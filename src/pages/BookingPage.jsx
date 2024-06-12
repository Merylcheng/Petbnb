import { useState, useEffect } from "react";

const BookingPage = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false); //hide or display upd form
  const [formData, setFormData] = useState({
    id: "",
    startDate: "",
    endDate: "",
    user: "",
    sitter: "",
  });
  const [formDisplayData, setFormDisplayData] = useState({
    //display name of user and sitter instead of id no
    userName: "",
    sitterName: "",
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/bookings?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Get YYYY-MM-DD from ISO string
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleShowUpdateForm = (booking) => {
    setFormData({
      id: booking._id,
      startDate: formatDate(booking.startDate),
      endDate: formatDate(booking.endDate),
      user: booking.user._id,
      sitter: booking.sitter._id,
    });
    setFormDisplayData({
      userName: booking.user.name,
      sitterName: booking.sitter.name,
    });
    setShowUpdateForm(true);
  };

  const handleUpdateBooking = async () => {
    const { id, startDate, endDate, user, sitter } = formData;
    const updatedData = {
      startDate,
      endDate,
      user,
      sitter,
    };

    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error("Failed to update booking");
      }
      const updatedBooking = await response.json();
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id ? updatedBooking : booking
        )
      );
      setShowUpdateForm(false); //hide udp form
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/images/pet4.jpg')` }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-8">Bookings</h1>
        {bookings.length === 0 ? (
          <p className="text-black text-lg">No bookings found.</p>
        ) : (
          <ul className="divide-y divide-gray-400 divide-solid divide-y-2">
            {bookings.map((booking, index) => (
              <li
                key={booking._id}
                className={`py-4 ${index !== 0 ? "border-t border-gray-300" : ""}`}
              >
                <div className="text-black">
                  <strong className="font-semibold">Start Date:</strong>{" "}
                  {formatDate(booking.startDate)}
                </div>
                <div className="text-black">
                  <strong className="font-semibold">End Date:</strong>{" "}
                  {formatDate(booking.endDate)}
                </div>
                <div className="text-black">
                  <strong className="font-semibold">User:</strong>{" "}
                  {booking.user?.name}
                </div>
                <div className="text-black">
                  <strong className="font-semibold">Sitter:</strong>{" "}
                  {booking.sitter?.name}
                </div>
                <div className="mt-4">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
                    onClick={() => handleDeleteBooking(booking._id)}
                  >
                    Delete Booking
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    onClick={() => handleShowUpdateForm(booking)}
                  >
                    Update Booking
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {showUpdateForm && (
          <div className="mt-8 text-black">
            <h2 className="text-xl font-bold mb-4">Update Booking</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateBooking();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Start Date:
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">User:</label>
                <input
                  type="text"
                  name="user"
                  value={formDisplayData.userName}
                  disabled
                  className="border border-gray-300 rounded px-3 py-2 w-full bg-gray-200"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold">Sitter:</label>
                <input
                  type="text"
                  name="sitter"
                  value={formDisplayData.sitterName}
                  disabled
                  className="border border-gray-300 rounded px-3 py-2 w-full bg-gray-200"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowUpdateForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;

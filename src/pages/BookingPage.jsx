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
    <div>
      <h1>Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <strong>Start Date:</strong> {formatDate(booking.startDate)}
              <br />
              <strong>End Date:</strong> {formatDate(booking.endDate)}
              <br />
              <strong>User:</strong> {booking.user?.name}
              <br />
              <strong>Sitter:</strong> {booking.sitter?.name}
              <br />
              <button onClick={() => handleDeleteBooking(booking._id)}>
                Delete Booking
              </button>
              <button onClick={() => handleShowUpdateForm(booking)}>
                Update Booking
              </button>
              <br />
              <hr />
            </li>
          ))}
        </ul>
      )}

      {showUpdateForm && (
        <div>
          <h2>Update Booking</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateBooking();
            }}
          >
            <label>
              Start Date:
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              End Date:
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              User:
              <input
                type="text"
                name="user"
                value={formDisplayData.userName}
                disabled
              />
            </label>
            <br />
            <label>
              Sitter:
              <input
                type="text"
                name="sitter"
                value={formDisplayData.sitterName}
                disabled
              />
            </label>
            <br />
            <button type="submit">Update</button>
            <button onClick={() => setShowUpdateForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingPage;

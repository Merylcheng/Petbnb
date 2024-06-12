import { useState, useEffect } from "react";

const BookingPage = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

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

  // Function to format date as YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Get YYYY-MM-DD from ISO string
  };

  // Function to handle deletion of a booking
  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      // Remove the deleted booking from the state
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div>
      <h1>Bookings</h1>
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
            <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingPage;

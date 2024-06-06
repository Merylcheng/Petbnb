import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingForm from "./BookingForm";

// allow big cal to uds and format dates correctly
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings");
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  //new booking, look into hardcoded id and alternatives
  const handleBookingSubmit = async (booking) => {
    const { title, startDate, endDate } = booking;
    const newBooking = {
      title,
      startDate,
      endDate,
      sitter: "665dceaa8e608fe51d3b4a5e",
      user: "66572b683d21c39aeb26cd1c",
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const data = await response.json();
      setBookings([...bookings, data]);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <BookingForm onBookingSubmit={handleBookingSubmit} />
      </div>
      <Calendar
        localizer={localizer}
        events={bookings.map((booking) => ({
          id: booking._id,
          title: booking.title,
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;

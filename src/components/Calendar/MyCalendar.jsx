import { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingForm from "./BookingForm";

// allow big cal to uds and format dates correctly
const localizer = momentLocalizer(moment);

const MyCalendar = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = useCallback(async () => {
    try {
      const response = await fetch(`/api/bookings?userId=${userId}`); //BOOKING DETAILS BASED ON USER
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      console.log("Fetched bookings:", data); //CHECK ID
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchBookings();
    }
  }, [userId, fetchBookings]);

  //NEW BOOKING, BASED ON ID. LOOK INTO TAG USER TO SITTER AFTER SUBMIT
  const handleBookingSubmit = async (booking) => {
    const { title, startDate, endDate } = booking;

    const newBooking = {
      title,
      startDate,
      endDate,
      sitter: userId,
      user: userId,
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

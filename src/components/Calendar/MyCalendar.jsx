import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingForm from "./BookingForm";

// allow big cal to uds and format dates correctly
const localizer = momentLocalizer(moment);

const MyCalendar = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) return;

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
    };

    fetchBookings();
  }, [userId]);

  const handleBookingSubmit = async (booking) => {
    const { title, startDate, endDate } = booking;

    //NEW BOOKING, BASED ON ID. LOOK INTO TAG USER TO SITTER AFTER SUBMIT
    const newBooking = {
      title,
      startDate: moment(startDate).toISOString(), //ensure dates are consistently formatted
      endDate: moment(endDate).toISOString(),
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
      setBookings((prevBookings) => [...prevBookings, data]);
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

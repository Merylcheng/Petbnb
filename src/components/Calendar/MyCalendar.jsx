import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingForm from "./BookingForm";

// allow big cal to uds and format dates correctly
const localizer = momentLocalizer(moment);

const MyCalendar = ({ userId, userName }) => {
  const [bookings, setBookings] = useState([]);
  const location = useLocation();

  // Extract sitterId from query parameters
  const searchParams = new URLSearchParams(location.search);
  const sitterId = searchParams.get("sitterId");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Construct the URL for the API request
        let url = `/api/bookings?userId=${userId}`;
        if (sitterId) {
          url += `&sitterId=${sitterId}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        console.log("Fetched bookings:", data);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [userId, sitterId]);

  const handleBookingSubmit = async (booking) => {
    const { startDate, endDate } = booking;

    // Check if got 2 bookings overlapping with the new booking
    const overlappingBookings = bookings.filter(
      (b) =>
        new Date(b.startDate) < new Date(endDate) &&
        new Date(b.endDate) > new Date(startDate)
    );

    if (overlappingBookings.length >= 2) {
      alert(
        "EXCUSE ME I KNOW MY SITTER PROVIDES VERY GOOD SERVICE BUT YOU CANNOT BOOK ANYMORE! MY SITTER HAS A MAX OCCUPANCY RATE OF 2 PETS!!"
      );

      return;
    }

    const newBooking = {
      title: userName,
      startDate: moment(startDate).toISOString(), // ensure dates are consistently formatted
      endDate: moment(endDate).toISOString(),
      sitter: sitterId || userId,
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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/images/pet4.jpg')` }}
    >
      <div
        className="w-full max-w-screen-lg p-8 bg-opacity-0 rounded-lg "
        style={{ marginLeft: "-700px" }}
      >
        <div className="mb-8">
          <BookingForm
            onBookingSubmit={handleBookingSubmit}
            userName={userName}
          />
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
          style={{
            height: 500,
          }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;

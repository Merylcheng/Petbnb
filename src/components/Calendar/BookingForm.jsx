import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ onBookingSubmit }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    onBookingSubmit({ startDate, endDate });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-8 p-4 border rounded-lg shadow-lg "
    >
      <div className="bg-indigo-600 text-white py-4 px-4 rounded-t-lg">
        <h2 className="text-xl font-bold mb-2 text-center">Book Your Stay</h2>
        <p className="text-sm text-gray-200 mb-6 text-center">
          Fill in your dates
        </p>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Start Date:
          </label>
          <DatePicker
            className="border rounded px-3 py-2 w-full"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            End Date:
          </label>
          <DatePicker
            className="border rounded px-3 py-2 w-full"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Book
        </button>
      </div>
    </form>
  );
};

export default BookingForm;

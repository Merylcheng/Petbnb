const Booking = require("../../models/Booking");

// GET ALL
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("sitter user");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE A BOOKING
const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // UPDATE BOOKING
// const updateBooking = async (req, res) => {
//   try {
//     const updatedBooking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedBooking);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // DELETE
// const deleteBooking = async (req, res) => {
//   try {
//     await Booking.findByIdAndDelete(req.params.id);
//     res.json({ message: "Booking deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  createBooking,
  getAllBookings,
};

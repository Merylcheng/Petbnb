const Booking = require("../../models/Booking");

// // GET ALL BOOKINGS FOR A SPECIFIC USER
// const getAllBookings = async (req, res) => {
//   const { userId } = req.query;
//   try {
//     const bookings = await Booking.find({ user: userId }).populate(
//       "sitter user"
//     );
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// GET ALL BOOKINGS FOR A SPECIFIC USER OR SITTER
const getAllBookings = async (req, res) => {
  const { userId } = req.query;
  try {
    // Find bookings where either user or sitter matches the userId
    const bookings = await Booking.find({
      $or: [{ user: userId }, { sitter: userId }],
    }).populate("sitter user");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const { startDate, endDate, sitter: sitterId, user: userId } = req.body;

    // Check if got 2 bookings overlapping with the new booking
    const overlappingBookingsCount = await Booking.countDocuments({
      sitter: sitterId || userId,
      $or: [
        { startDate: { $lt: endDate }, endDate: { $gt: startDate } },
        { startDate: { $gte: startDate, $lt: endDate } },
        { endDate: { $gt: startDate, $lte: endDate } },
      ],
    });

    if (overlappingBookingsCount >= 2) {
      return res
        .status(400)
        .json({ error: "Cannot create more than 2 overlapping bookings." });
    }

    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
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

// // GET ALL
// const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find().populate("sitter user");
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const Booking = require("../../models/Booking");

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

//create booking + max cap at 2
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

const updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const updatedData = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updatedData,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    res.json({ message: "Booking deleted successfully.", deletedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
};

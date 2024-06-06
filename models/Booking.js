const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  sitter: {
    type: Schema.Types.ObjectId,
    ref: "Sitter",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  //   status: {
  //     type: String,
  //     enum: ["pending", "approved", "rejected"],
  //     default: "pending",
  //   },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;

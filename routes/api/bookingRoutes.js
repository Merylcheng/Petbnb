const express = require("express");
const router = express.Router();
const bookingsCtrl = require("../../controllers/api/bookingsController");

router.get("/", bookingsCtrl.getAllBookings);
router.post("/", bookingsCtrl.createBooking);
// router.put("/:bookingId", bookingsCtrl.updateBooking);
router.delete("/:bookingId", bookingsCtrl.deleteBooking);

module.exports = router;

const express = require("express");
const router = express.Router();
const bookingsCtrl = require("../../controllers/api/bookingsController");

router.get("/", bookingsCtrl.getAllBookings);
router.post("/", bookingsCtrl.createBooking);
// router.put("/:id", bookingsCtrl.updateBooking);
// router.delete("/:id", bookingsCtrl.deleteBooking);

module.exports = router;

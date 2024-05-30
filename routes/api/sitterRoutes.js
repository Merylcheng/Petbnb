const express = require("express");
const router = express.Router();
const sittersCtrl = require("../../controllers/api/sittersController");

router.post("/", sittersCtrl.create);
router.get("/", sittersCtrl.getAll);

module.exports = router;

const express = require("express");
const router = express.Router();
const sittersCtrl = require("../../controllers/api/sittersController");
const upload = require("../../config/multer");

router.post("/", upload.single("image"), sittersCtrl.create);
router.get("/", sittersCtrl.getAll);
router.get("/:id", sittersCtrl.getSitterById);
router.delete("/:id", sittersCtrl.deleteById);
router.get("/search", sittersCtrl.search);

module.exports = router;

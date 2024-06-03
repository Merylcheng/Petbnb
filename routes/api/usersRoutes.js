const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

//ensure role specified
const ensureRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ msg: "Forbidden" });
    }
    next();
  };
};

// POST /api/users
router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);
router.get("/check-token", [ensureLoggedIn], usersCtrl.checkToken);

// Role-based routes
router.get(
  "/some-user-route",
  [ensureLoggedIn, ensureRole("user")],
  (req, res) => {
    res.json({ msg: "User-specific content" });
  }
);

router.get(
  "/some-sitter-route",
  [ensureLoggedIn, ensureRole("sitter")],
  (req, res) => {
    res.json({ msg: "Sitter-specific content" });
  }
);

module.exports = router;

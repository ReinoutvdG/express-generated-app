const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Login
router.get("/login", authController.showLogin);
router.post("/login", authController.login);

// Register
router.get("/register", (req, res) => {
  res.render("auth/register", { error: null });
});
router.post("/register", authController.register);

// Logout
router.get("/logout", authController.logout);

module.exports = router;

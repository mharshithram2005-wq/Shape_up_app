const express = require("express");
const router = express.Router();

const {
  createUserStatus,
  getUserStatus,
  updateUserStatus,
} = require("../controllers/userStatusController.js");

const { protect } = require("../middleware/authMiddleware.js");

router
  .route("/status")
  .post(protect, createUserStatus)
  .get(protect, getUserStatus)
  .put(protect, updateUserStatus);

module.exports = router;

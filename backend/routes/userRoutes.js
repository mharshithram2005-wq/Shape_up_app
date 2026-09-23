const express = require("express");
const router = express.Router();

const {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController.js");

const {
  logWaterIntake,
  updateWaterIntake,
  getUserWaterIntake,
} = require("../controllers/userWaterIntakeController.js");

const { protect } = require("../middleware/authMiddleware.js");

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/water-intake")
  .post(protect, logWaterIntake)
  .put(protect, updateWaterIntake);

router.route("/water-intake/:date").get(protect, getUserWaterIntake);

module.exports = router;

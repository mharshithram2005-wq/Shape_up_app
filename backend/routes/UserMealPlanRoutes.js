const express = require("express");
const router = express.Router();

const {
  createUserMealPlan,
  getUserMealPlan,
  updateUserMealPlan,
} = require("../controllers/UserMealPlanController.js");

const { protect } = require("../middleware/authMiddleware.js");

router
  .route("/meal-plan")
  .post(protect, createUserMealPlan)
  .put(protect, updateUserMealPlan);

router.route("/meal-plan/:date").get(protect, getUserMealPlan);

module.exports = router;

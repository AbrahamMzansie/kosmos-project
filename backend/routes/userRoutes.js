const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userControllers = require("../controllers/userController");

router.route("/admin").post(userControllers.registerAdminUser);
router.route("/approve").get(userControllers.getUsers);
router.route("/approve-user/:id").get(userControllers.approverUser);
router
  .route("/")
  .post(userControllers.registerUser)
  .get(authMiddleware.protect, authMiddleware.admin, userControllers.getUsers);
router
  .route("/profile")
  .get(authMiddleware.protect, userControllers.getUserProfile)
  .put(authMiddleware.protect, userControllers.updateUserProfile);

router.post("/login", userControllers.authUser);
module.exports = router;

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const notificationController = require("../controllers/notificationController");

router.get("/" , authMiddleware.protect, notificationController.getUserNotifications);
router.route("/:streamID").get(authMiddleware.protect, notificationController.updateNotification)
router.get("/:streamID" ,authMiddleware.protect, notificationController.updateNotification);
module.exports = router;

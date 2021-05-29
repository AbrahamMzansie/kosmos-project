const Notification = require("../models/notificationModel");
const Product = require("../models/productModels");
const asyncHandler = require("express-async-handler");

//@desc : get user notification
//@route : GET /api/notifications
//@access : private
const getUserNotifications = asyncHandler(async (req, res) => {
    const  notification = await Notification.find({recipient : req.user.nameHandler})
      .populate("notifications.sender", "nameHandler read image")
      .populate("notifications.screamId");
      res.json({notification});
  });

  module.exports = {
    getUserNotifications,  
  }
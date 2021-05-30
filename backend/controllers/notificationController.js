const Notification = require("../models/notificationModel");
const asyncHandler = require("express-async-handler");

//@desc : get user notification
//@route : GET /api/notifications
//@access : private
const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    recipient: req.user.nameHandler,
  })
    .populate("sender")
    .populate("screamId");
  res.json(notifications);
});

//@desc : UPDATE NOTIFICATION
//@route : PUT /api/notifications/:streamID
//@access : private
const updateNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.streamID);
  if (notification) {
   const updatedNotifications =  await Notification.findOneAndUpdate({ _id: req.params.streamID},
    { $set: {read: true} } , { new: true })
    .populate("sender")
    .populate("screamId");
      res.json(updatedNotifications);
  } else {
    res.status(404);
    throw new Error("Notification not found");
  }
});




module.exports = {
  getUserNotifications,
  updateNotification,
};

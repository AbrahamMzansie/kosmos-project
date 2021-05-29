const mongoose = require("mongoose");
const notificationSchema = mongoose.Schema(
  {
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
    },
    recipient: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
    },
    nameHandler: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    screamId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Stream",
    },
  },
  {
    timestamps: true,
  }
);
const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;

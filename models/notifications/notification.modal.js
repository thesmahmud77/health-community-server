import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    medicineName: {
      type: String,
      required: true,
      trim: true,
    },
    eatingTime: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const notificationDatabase = mongoose.model(
  "notifications",
  notificationSchema,
);

export default notificationDatabase;

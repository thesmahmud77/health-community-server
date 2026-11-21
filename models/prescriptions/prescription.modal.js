import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: true,
      trim: true,
    },
    eatingTime: {
      type: String, // "HH:mm" (24-hour format, যেমন "08:00", "21:30")
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const prescriptionSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    medicines: {
      type: [medicineSchema],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "অন্তত একটি ওষুধ দিন",
      },
    },
    lastSentKey: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const prescriptionDatabase = mongoose.model(
  "prescriptions",
  prescriptionSchema,
);

export default prescriptionDatabase;

import mongoose from "mongoose";

const testItemSchema = new mongoose.Schema(
  {
    testName: {
      type: String,
      required: true,
      trim: true,
    },
    testCode: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    sampleType: {
      type: String,
      required: true,
      trim: true,
    },
    reportDelivery: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const hospitalSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "diagnostic_center",
        "government_hospital",
        "private_hospital",
        "specialized_hospital",
      ],
      required: true,
      trim: true,
    },
    area: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: [String],
      default: [],
    },
    emergencyAvailable: {
      type: Boolean,
      default: false,
    },
    open24Hours: {
      type: Boolean,
      default: false,
    },
    operatingHours: {
      type: String,
      required: true,
      trim: true,
    },
    specialties: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    tests: {
      type: [testItemSchema],
      default: [],
    },
    demoData: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const hospitalDatabase = mongoose.model("hospitals", hospitalSchema);

export default hospitalDatabase;

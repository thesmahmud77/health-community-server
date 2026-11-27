import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Test name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    sampleType: {
      type: String,
      required: true,
      trim: true,
    },
    govtFee: {
      type: Number,
      required: true,
      min: 0,
    },
    privateFeeRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    reportDeliveryTime: {
      type: String,
      default: "Same Day",
    },
    preparation: {
      type: String,
      default: "No special preparation required",
    },
    availableCenters: [
      {
        hospitalName: { type: String, required: true },
        location: { type: String, required: true },
        floorOrRoom: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const testDatabse = mongoose.model("testcollection", testSchema);

export default testDatabse;

import mongoose from "mongoose";

const categorisSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    autoApprove: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const categoriesDatabase = mongoose.model("categories", categorisSchema);
export default categoriesDatabase;

import mongoose from "mongoose";

const safetyKeywordSchema = new mongoose.Schema(
  {
    blockedKeywords: { type: [String], default: [] },
  },
  { collection: "safetyKeywords" },
);

const safetyKeywordDatabase = mongoose.model(
  "safety_keywords",
  safetyKeywordSchema,
);

export default safetyKeywordDatabase;

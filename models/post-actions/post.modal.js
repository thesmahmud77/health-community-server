import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["like", "dislike", "care", "helpful"],
      required: true,
    },
  },
  { _id: false },
);

const commentItemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const reportItemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    report: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const postSchema = new mongoose.Schema(
  {
    PostId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    authorId: {
      type: String,
      required: true,
      trim: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    postType: {
      type: String,
      enum: ["experience", "question", "help_request", "help_offer"],
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    reactions: {
      type: [reactionSchema],
      default: [],
    },
    commentsCount: {
      type: [commentItemSchema],
      default: [],
    },
    Reports: {
      type: [reportItemSchema],
      default: [],
    },
    demoPost: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const postDatabase = mongoose.model("postCollections", postSchema);

export default postDatabase;

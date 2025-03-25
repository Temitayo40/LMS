import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  courseId: { type: mongoose.Types.ObjectId, required: true, ref: "Course" },
  userId: { type: String, required: true, ref: "User" },
  // userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  amount: { type: Number, required: true },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "completed", "failed"],
  },
});

export const Purchase = mongoose.model("Purchase", purchaseSchema);

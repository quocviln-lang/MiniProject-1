const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true } // tự động thêm createdAt, updatedAt
);

module.exports = mongoose.model("Feedback", feedbackSchema, "feedbacks");

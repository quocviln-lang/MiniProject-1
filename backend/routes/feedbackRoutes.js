const express = require("express");
const Feedback = require("../models/Feedback");
const router = express.Router();

// 📩 Gửi feedback (từ trang Contact)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const fb = new Feedback({ name, email, message });
    await fb.save();
    res.status(201).json({ message: "Feedback saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 Lấy danh sách feedback (cho trang Admin)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

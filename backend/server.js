const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const phoneRoutes = require("./routes/phoneRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const app = express();
const User = require("./models/User.js");
const bcrypt = require("bcrypt");
const orderRoutes = require("./routes/orderRoutes.js");
const bankRoutes = require("./routes/bankRoutes.js");
const purchasesRoute = require("./routes/purchasesRoutes.js");
const addressRoutes = require("./routes/addressRoutes.js");
const payMethodRoutes = require("./routes/payMethodRoutes.js");
const statsRoutes = require("./routes/statsRoutes.js");
const Pin = require("./models/pin.js");
const Specs = require("./models/specs.js");
const Review = require("./models/review.js");
const feedbackRoutes = require("./routes/feedbackRoutes.js");
// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/phone-shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => console.error("❌ Lỗi MongoDB:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/phones", phoneRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/purchases", purchasesRoute);
app.use("/api/addresses", addressRoutes);
app.use("/api/paymethods", payMethodRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/pins", require("./routes/pinRoutes"));
app.use("/api/specs", require("./routes/specsRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/feedbacks", feedbackRoutes);

// Server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`)
);

// Kiểm tra user
app.post("/api/auth/check-user", async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findOne({ username, email });
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});


// Đổi mật khẩu
app.post("/api/auth/reset-password", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ username, email });
  if (!user) return res.status(400).json({ error: "Người dùng không tồn tại" });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt); // hash mật khẩu

  await user.save();

  res.json({ message: "Đổi mật khẩu thành công" });
});

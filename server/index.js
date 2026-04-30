const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ✅ STEP 1 — CORS must be the VERY FIRST middleware (before body parsers)
const chromeHeaders = require("./chrome-headers");
app.use(chromeHeaders);

// ✅ STEP 2 — Body parsers AFTER CORS
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ✅ STEP 3 — Request logger (helps debug Chrome vs Firefox differences)
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString("en-IN");
  console.log(`[${time}] ${req.method} ${req.path} | Origin: ${req.headers.origin || "none"}`);
  next();
});

// ✅ STEP 4 — Routes
const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);

// ✅ STEP 5 — Health check (also used as keep-alive ping for Render)
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    time: new Date().toISOString(),
    mongo: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// ✅ STEP 6 — 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.path} not found` });
});

// ✅ STEP 7 — Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err.stack);
  res.status(500).json({ success: false, message: "Internal server error." });
});

// ✅ STEP 8 — Connect MongoDB then start server
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing from .env — server cannot start.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📬 Contact API → http://localhost:${PORT}/api/contact`);
      console.log(`🏥 Health     → http://localhost:${PORT}/api/health`);
    });

    // ✅ Render free tier fix — ping self every 14 minutes to prevent cold sleep
    // (Render spins down free services after 15 min of inactivity)
    if (process.env.RENDER_EXTERNAL_URL) {
      const pingUrl = `${process.env.RENDER_EXTERNAL_URL}/api/health`;
      console.log(`🔔 Keep-alive ping enabled → ${pingUrl}`);
      setInterval(async () => {
        try {
          const res = await fetch(pingUrl);
          console.log(`[Keep-alive] Ping OK — ${new Date().toLocaleTimeString("en-IN")}`);
        } catch (e) {
          console.warn("[Keep-alive] Ping failed:", e.message);
        }
      }, 14 * 60 * 1000); // every 14 minutes
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
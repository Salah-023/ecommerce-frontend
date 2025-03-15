const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors()); // Allow requests from Vue frontend
app.use(express.static("public")); // Serve static files

// Set up storage location and filename
const storage = multer.diskStorage({
  destination: "public/images/products/", // Save files in Vue's public folder
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep original filename
  },
});

const upload = multer({ storage: storage });

// API Endpoint to Upload Image
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ filename: req.file.filename }); // Send back the filename
});

// Start Server
const PORT = 5000; // Runs on port 5000
app.listen(PORT, () => {
  console.log(`Upload server running at http://localhost:${PORT}`);
});

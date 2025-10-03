const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const consentRoutes = require("./routes/consent");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/healthrisk", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

app.use("/api", consentRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Express API running on http://localhost:${PORT}`));

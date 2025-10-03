const mongoose = require("mongoose");

const ConsentSchema = new mongoose.Schema({
  consentId: String,
  blockchainHash: String,
  grantedAt: Date,
  revoked: { type: Boolean, default: false }
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number,
  wearables: {
    heartRate: Number,
    steps: Number,
    sleepHours: Number
  },
  clinicalNotes: String,
  consents: [ConsentSchema]
});

module.exports = mongoose.model("User", UserSchema);

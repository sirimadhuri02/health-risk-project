const express = require("express");
const axios = require("axios");
const Web3 = require("web3");
const User = require("../models/User");

const router = express.Router();

// Blockchain Setup
const web3 = new Web3("http://127.0.0.1:7545"); // Ganache
const contractABI = require("../blockchain/ConsentABI.json");
const contractAddress = "0x123..."; // deployed address
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Add Consent
router.post("/give-consent/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    const tx = await contract.methods
      .storeConsent(userId, Date.now().toString())
      .send({ from: "0xYourAccount" });

    user.consents.push({
      consentId: tx.transactionHash,
      blockchainHash: tx.transactionHash,
      grantedAt: new Date()
    });

    await user.save();
    res.json({ message: "Consent stored on blockchain", txHash: tx.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send data to FastAPI ML for Risk Prediction
router.post("/predict-risk/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const response = await axios.post("http://127.0.0.1:8000/risk-predict", {
      heartRate: user.wearables.heartRate,
      steps: user.wearables.steps,
      sleepHours: user.wearables.sleepHours
    });

    res.json({ prediction: response.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

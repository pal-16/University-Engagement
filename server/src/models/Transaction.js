const mongoose = require("mongoose");

const transaction = new mongoose.Schema(
  {
    senderID: {
      type: String,
      required: true,
    },
    senderType: {
      type: String,
      required: true
    },
    receiverID: {
      type: String,
      required: true
    },
    receiverType: {
      type: String,
      required: true
    },
    coins: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("transaction", transaction);

module.exports = Transaction;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrowdfundingSchema = new Schema(
  {
    userID:{
        type: String,
        required:true
    },
    userType:{
        type: String,
        required:true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    currentAmount: {
        type: Number,
        required: false,
        default:0
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted"],
      default: "Pending",
      required: false
    },
    amountNeeded:{
        type:Number,
        required:true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
      required: false
    },
  },
  { timestamps: true }
);

const Crowdfunding = mongoose.model("crowdfunding", CrowdfundingSchema);
module.exports = Crowdfunding;

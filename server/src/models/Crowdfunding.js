const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrowdfundingSchema = new Schema(
  {
    studentID: {
      type: Schema.Types.ObjectId,
      ref: "student",
      required: true
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
    amountNeeded:{
        type:Number,
        required:true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
      required: false
    }
  },
  { timestamps: true }
);

const Crowdfunding = mongoose.model("crowdfunding", CrowdfundingSchema);
module.exports = Crowdfunding;

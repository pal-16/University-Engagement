const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const student = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validator.isEmail
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  department: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    enum: ["BTech", "MTech", "MCA", "Diploma"],
    required: true
  },
  github: {
    type: String,
    default: "www.github.com"
  },
  linkedin: {
    type: String,
    default: "www.linkedin.com"
  },
  twitter: {
    type: String,
    default: "www.twitter.com"
  },
  admissionYear: {
    type: Number,
    required: true
  },
  applications: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "application"
      }
    ],
    default: []
  },
  coins:{
    type: Number,
    required: false,
    default: 0
  },
  rank:{
    type: Number,
    required: false,
    default: 0
  },
  totalCoinsAchieved:{
    type: Number,
    required: false,
    default: 0
  },
  transfer: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction"
      }
    ],
    default: []
  },
  crowdfunding: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "crowdfunding"
      }
    ],
    default: []
  },
  project: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
      }
    ],
    default: []
  }
});

student.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

student.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Student = mongoose.model("student", student);

module.exports = Student;

const Student = require("../models/Student");
const axios = require("axios");
const auth = require("../utilities/auth");
const bucket = require("../config/firebase");

//Register Student
exports.registerStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      $or: [{ studentID: req.body.studentID }, { email: req.body.email }]
    });

    if (student) {
      return res.status(400).json({
        error: "Student with this ID or email already exists"
      });
    }

 
    let fileUrl = "";



    const newStudent = await Student.create({
      ...req.body,
      credentialsURL: fileUrl
    });
    const token = auth.signToken(newStudent._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        userID: newStudent._id
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//Student Login
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email }).select("+password");

    if (
      !student ||
      !(await student.correctPassword(password, student.password))
    ) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = auth.signToken(student._id);
    res.status(200).json({
      status: "success",
      token,
      data: {
        userID: student._id,
        userCoins:student.coins
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      status: "success",
      results: students.length,
      data: {
        students
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getStudent = async (req, res) => {
  try {
    let student = await Student.findById(req.params.studentID);
    if (!student) return res.status(404).json({ error: "Invalid Student ID" });
    return res.status(200).json({
      name: student.name,
      studentID: student.studentID,
      email: student.email,
      department: student.department,
      year: student.admissionYear,
      degree: student.degree,
      coins:student.coins
      
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

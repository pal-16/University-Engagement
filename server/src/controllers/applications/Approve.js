const Application = require("../../models/Application");
const Student = require("../../models/Student");
const Faculty = require("../../models/Faculty");
const Transaction = require("../../models/Transaction");
const bucket = require("../../config/firebase");
const axios = require("axios");

  exports.approveApplication=async(req, res)=>{
    try {
      let application = await Application.findById(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Invalid Application ID" });
      }

      if (application.status !== "Pending")
        return res
          .status(404)
          .json({ error: "Only pending applications can be approved" });

      let student = await Student.findById(application["studentID"]);
      if (!student) {
        return res.status(404).json({ error: "Invalid Student ID" });
      }
      const total = req.body.reward+student.coins;
  
      const newTransaction = new Transaction({
        senderID: req.body.facultyID,
        senderType: "faculty",
        receiverID: application["studentID"],
        receiverType: "student",
        coins: total
      });
      await newTransaction.save();
      
      await Student.findByIdAndUpdate(application["studentID"], { coins: total});

      await Student.findByIdAndUpdate(application["studentID"], {
        $push: { transfer: newTransaction._id }
      });
      await Faculty.findByIdAndUpdate(req.body.facultyID, {
        $push: { transfer: newTransaction._id }
      });

      application.status = "Accepted";
      application.reward = reward;
      await application.save();

      return res.status(200).json({ message: "Application approved" });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };
  
  
const Application = require("../../models/Application");
const Student = require("../../models/Student");
const Faculty = require("../../models/Faculty");
const Transaction = require("../../models/Transaction");
const transporter= require('../../config/mail');
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
        coins: req.body.reward
      });
      await newTransaction.save();
      let info = await transporter.sendMail({
        from: 'mantrypalak@gmail.com',
        to: student.email,
        subject: 'Faculty Acceptance',
        html: '<h1>Faculty has verified your application and you have been alloted coins</h1>'
    });
    console.log(info);
      await Student.findByIdAndUpdate(application["studentID"], { coins: total, totalCoinsAchieved: total});

      await Student.findByIdAndUpdate(application["studentID"], {
        $push: { transfer: newTransaction._id }
      });
      await Faculty.findByIdAndUpdate(req.body.facultyID, {
        $push: { transfer: newTransaction._id }
      });

      application.status = "Accepted";
      application.reward = req.body.reward;
      await application.save();

      return res.status(200).json({ message: "Application approved" });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };
  
  
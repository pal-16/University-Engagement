const Application = require("../../models/Application");
const Student = require("../../models/Student");
const Faculty = require("../../models/Faculty");
const bucket = require("../../config/firebase");
const axios = require("axios");
const transporter= require('../../config/mail');

exports.rejectApplication=async(req, res)=>{
    try {
      let application = await Application.findById(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Invalid Application ID" });
      }
      let student = await Student.findById(application["studentID"]);
      if (application.status !== "Pending")
        return res
          .status(404)
          .json({ error: "Only pending applications can be rejected" });

      application.status = "Rejected";
      await application.save();
      let info = await transporter.sendMail({
        from: 'mantrypalak@gmail.com',
        to: student.email,
        subject: 'Faculty Acceptance',
        html: '<h1>Faculty has verified your application and the application has been rejected</h1>'
    });
      return res.status(200).json({
        message: "Application rejected by faculty"
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
};
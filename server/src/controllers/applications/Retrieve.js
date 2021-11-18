const Application = require("../../models/Application");
const Student = require("../../models/Student");
const Faculty = require("../../models/Faculty");
const bucket = require("../../config/firebase");
const axios = require("axios");


 exports.getStudentApplications=async(req, res)=>{
    try {
      const applications = await Application.find({ studentID: req.params.id });
      return res.status(200).json({ applications });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };

  exports.getFacultyApplications=async(req, res)=> {
    try {
      const applications = await Application.find({ facultyID: req.params.id });
      return res.status(200).json({ applications });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };

  exports.getApplication=async(req, res)=>{
    try {
      const application = await Application.findById(req.params.id)
        .populate("studentID")
        .populate("facultyID")
        .exec();
      if (application) {
        return res.status(200).json(application);
      } else {
        return res.status(404).json({ error: "Invalid Application ID" });
      }
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };

 
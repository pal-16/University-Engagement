const Application = require("../../models/Application");
const Student = require("../../models/Student");
const Faculty = require("../../models/Faculty");
const bucket = require("../../config/firebase");
const axios = require("axios");
exports. updateApplication=async(req, res)=>{
    try {
      let application = await Application.findById(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Invalid Application ID" });
      }

      if (application.status !== "Pending")
        return res
          .status(404)
          .json({ error: "Only pending applications can be updated" });

      let altered = false;
      if (req.body.hasOwnProperty("domainAchievement")) {
        application["domainAchievement"] = req.body["domainAchievement"];
        altered = true;
      }

      if (req.body.hasOwnProperty("title")) {
        application.title = req.body.title;
        altered = true;
      }

      if (req.body.hasOwnProperty("description")) {
        application.description = req.body.description;
        altered = true;
      }

      if (req.body.hasOwnProperty("links")) {
        application.links = req.body.links;
        altered = true;
      }

      if (!altered) {
        return res.status(200).json({
          status: "OK",
          message: "Nothing to be updated"
        });
      }
      await application.save();
      return res.status(200).json({
        status: "OK",
        message: "Application updated successfully"
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  exports.deleteApplication=async(req, res)=>{
    try {
      let application = await Application.findById(req.params.id);
      if (!application)
        return res.status(404).json({ error: "Invalid Application ID" });

      if (application.status !== "Pending")
        return res
          .status(404)
          .json({ error: "Only pending applications can be deleted" });

      await application.remove();
      await Student.updateOne(
        { _id: application.studentID },
        { $pull: { applications: req.params.id } }
      );
      await Faculty.updateOne(
        { _id: application.facultyID },
        { $pull: { applications: req.params.id } }
      );
      return res.status(200).json({
        status: "OK",
        message: "Application deleted successfully"
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };


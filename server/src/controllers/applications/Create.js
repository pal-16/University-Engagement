const Application = require("../../models/Application");
const Student = require("../../models/Student");
const Faculty = require("../../models/Faculty");
const bucket = require("../../config/firebase");
const axios = require("axios");


exports.applyForReward=async(req, res)=>{
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded"
        });
      }
      // const existingApplication = await Application.find({
      //   title: req.body.title,
      //   studentID: req.body.studentID,
      //   startDate: req.body.startDate
      // });
      // if (existingApplication) {
      //   return res.status(400).json({
      //     error:
      //       "An application with the same combination of Student ID, title and start date already exists"
      //   });
      // }
      const blob = bucket.file(req.file.originalname);
      const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;
      console.log(fileUrl);
      // Create writable stream and specifying file mimetype
      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype
        }
      });
      console.log(blobWriter);
      blobWriter.on("error", async (err) =>
        res.status(500).json({ error: err.message })
      );
      blobWriter.end(req.file.buffer);
      const application = await Application.create({
        ...req.body,
        files: [fileUrl]
      });

      await Student.findByIdAndUpdate(req.body.studentID, {
        $push: { applications: application }
      });
      await Faculty.findByIdAndUpdate(req.body.facultyID, {
        $push: { applications: application }
      });
      return res.status(201).json({
        message: "Application for reward created, status pending"
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
}; 
const Student = require("../../models/Student");
const Project = require("../../models/Project");

const bucket = require("../../config/firebase");
const axios = require("axios");

exports.createProject=async(req, res)=>{
    try {
      console.log(req.body);
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded"
        });
      }

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

      const projectPost = await Project.create({
        ...req.body,
        files: [fileUrl]
      });
      
            await Student.findByIdAndUpdate(req.body.userID, {
                $push: { project: projectPost }
            });
     
      return res.status(201).json({
        message: "Project Post created"
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
}; 
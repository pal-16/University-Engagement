const Student = require("../../models/Student");
const Project = require("../../models/Project");


exports.createProject=async(req, res)=>{
    try {

      const projectPost = await Project.create({
        ...req.body
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
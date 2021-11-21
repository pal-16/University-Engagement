const Project = require("../../models/Project");
const axios = require("axios");

const Student = require("../../models/Student");

 exports.getProjects=async(req, res)=>{
    try {
    
      const projects = await Project.find({}).populate('userID').populate('comments');
      console.log(projects);
      return res.status(200).json({ projects });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ error: e.message });
    }
  };

  

  exports.getProjectDetail=async(req, res)=>{
    try {
    
      const project = await Project.findById(req.params.id).populate('userID').populate({ path: 'comments' })
      if (project) {
        console.log(project)
        return res.status(200).json(project);
      } else {
        return res.status(404).json({ error: "Invalid Application ID" });
      }
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };

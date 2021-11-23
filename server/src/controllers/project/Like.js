const Student = require("../../models/Student");
const Faculty = require("../../models/Faculty");
const Project = require("../../models/Project");


exports.likeProject=async(req, res)=>{
    try {
    // find project by id
    console.log("===============================");
    console.log(req.body.userID);
    await Project.findByIdAndUpdate(req.params.id, {
      $push: { like: req.body.userID }
    });
    return res.status(200).json({ message: "Liked" });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
}; 
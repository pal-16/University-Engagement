const Student = require("../../models/Student");
const Faculty = require("../../models/Faculty");
const Project = require("../../models/Project");

const Comment = require("../../models/Comment");

exports.commentProject=async(req, res)=>{
    try {
   console.log(req.body);
    const newComment = new Comment({
      commentText: req.body.commentText,
      author: req.body.authorID,
      project: req.body.projectID
    });
    await newComment.save();
      console.log(newComment);
    await Project.findByIdAndUpdate(req.body.projectID, {   $push: { comments: newComment}});


    return res.status(200).json(newComment);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
}; 
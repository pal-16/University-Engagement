const Student = require("../../models/Student");
const Faculty = require("../../models/Faculty");
const Project = require("../../models/Project");

const Comment = require("../../models/Comment");

exports.commentProject=async(req, res)=>{
    try {
  
    const newComment = new Comment({
      commentText: req.body.commentText,
      author: req.body.authorID,
      project: req.body.projectID
    });
    await newComment.save();

    await Project.findByIdAndUpdate(req.body.projectID, {   $push: { comments: newComment}});

    let finalComment = await Comment.findById(newComment._id).populate('author');
  
    return res.status(200).json(finalComment);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
}; 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    userID : {
      type: Schema.Types.ObjectId,
      ref: "student",
      required: true
    },
    projectDomain: {
      type: String,
      enum: [
        "Web Development",
        "App Development",
        "Machine Learning",
        "Blockchain",
        "Cloud Computing",
        "Cybersecurity",
        "Others"
      ],
      default: "Web Development",
      required: true
    },
    semester: {
      type: String,
      enum: [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
        "Semester 8"
      ],
      default: "Semester 1",
      required: true
    },
    tags:  [{
      type: String,
      required: true
    }],
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    link:{
      type: String,
      required: false
    },
    files: {
      type: [
        {
          type: String
        }
      ],
      required: false,
      default: []
    },
    like: [{
      type: Schema.Types.ObjectId,
      ref: "student",
      required: false
    }],
    comments: [
      {
      type: Schema.Types.ObjectId,
      ref: "comment",
      required: false
    }]
  },
  { timestamps: true }
);

const Project = mongoose.model("project", ProjectSchema);
module.exports = Project;

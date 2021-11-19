const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    userID:{
      type: String,
      required:true
  },
  userType:{
    type: String,
    required:true
},
    domainTags: {
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
    title: {
      type: String,
      required: true
    },
    description: {
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
    links: {
      type: [
        {
          type: String
        }
      ],
      required: false,
      default: []
    }
  },
  { timestamps: true }
);

const Project = mongoose.model("project", ProjectSchema);
module.exports = Project;

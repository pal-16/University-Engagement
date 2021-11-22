const StudentController = require("./controllers/StudentController");
const FacultyController = require("./controllers/FacultyController");
const ApplicationController = require("./controllers/applications/index");
const CrowdfundingController = require("./controllers/crowdfunding/index");
const ProjectController = require("./controllers/project/index");

const uploader = require("./utilities/uploader");
const auth = require("./middleware/auth");

module.exports = (app) => {
  app.get("/api/check", (req, res) => {
    res.json("Connected");
  });

  //Student Routes
  app.post("/api/student/register", StudentController.registerStudent);
  app.post("/api/student/login", StudentController.loginStudent);
  app.get("/api/student", auth.loginRequired, StudentController.getAllStudents);
  app.get("/api/student/:id/applications/getAll",auth.loginRequired,ApplicationController.retrieve.getStudentApplications);
  app.get("/api/student/:studentID",auth.loginRequired,StudentController.getStudent);

  //Faculty Routes
  app.post("/api/faculty/register", FacultyController.registerFaculty);
  app.post("/api/faculty/login", FacultyController.loginFaculty);
  app.get("/api/faculty",auth.loginRequired,FacultyController.getAllFaculties);
  app.get("/api/faculty/:facultyID", auth.loginRequired,FacultyController.getFaculty);
  app.get("/api/faculty/:id/applications/getAll",auth.loginRequired,ApplicationController.retrieve.getFacultyApplications);

  //Application Routes
  app.post("/api/applications/new",auth.loginRequired,uploader.single("file"),ApplicationController.create.applyForReward);
  app.get("/api/applications/:id/getDetail",auth.loginRequired,ApplicationController.retrieve.getApplication);
  app.post("/api/applications/:id/approve",auth.loginRequired,ApplicationController.approve.approveApplication);
  app.post("/api/applications/:id/reject",auth.loginRequired,ApplicationController.reject.rejectApplication);
  app.put("/api/applications/:id",auth.loginRequired,ApplicationController.delete.updateApplication);
  app.delete("/api/applications/:id",auth.loginRequired,ApplicationController.delete.deleteApplication);


  app.post("/api/crowdfundings/new",auth.loginRequired,CrowdfundingController.createPost.createPost);
  app.get("/api/crowdfundings/getAll",auth.loginRequired,CrowdfundingController.getPost.getCrowdfundingPosts);
  app.post("/api/crowdfundings/donate",auth.loginRequired,CrowdfundingController.donate.donateCoins);
 
  app.post("/api/projects/new",auth.loginRequired,ProjectController.createProject.createProject);
  app.get("/api/projects/getAll",auth.loginRequired,ProjectController.display.getProjects);
  app.get("/api/projects/:id/getDetail",auth.loginRequired,ProjectController.display.getProjectDetail);
  app.post("/api/projects/:id/like",auth.loginRequired,ProjectController.like.likeProject);
  app.post("/api/projects/:id/comment",auth.loginRequired,ProjectController.comment.commentProject);
 
 
};

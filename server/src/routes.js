const StudentController = require("./controllers/StudentController");
const FacultyController = require("./controllers/FacultyController");
const ApplicationController = require("./controllers/applications/index");
const CrowdfundingController = require("./controllers/crowdfunding/index");

const uploader = require("./utilities/uploader");
const auth = require("./middleware/auth");

module.exports = (app) => {
  app.get("/api/check", (req, res) => {
    res.json("Hello World");
  });

  //Student Routes
  app.post("/api/student/register", StudentController.registerStudent);
  app.post("/api/student/login", StudentController.loginStudent);
  app.get("/api/student", auth.loginRequired, StudentController.getAllStudents);
  app.get("/api/student/:id/applications",auth.loginRequired,ApplicationController.retrieve.getStudentApplications);
  app.get("/api/student/:studentID",auth.loginRequired,StudentController.getStudent);

  //Faculty Routes
  app.post("/api/faculty/register", FacultyController.registerFaculty);
  app.post("/api/faculty/login", FacultyController.loginFaculty);
  app.get("/api/faculty",auth.loginRequired,FacultyController.getAllFaculties);
  app.get("/api/faculty/:facultyID", auth.loginRequired,FacultyController.getFaculty);
  app.get("/api/faculty/:id/applications",auth.loginRequired,ApplicationController.retrieve.getFacultyApplications);

  //Application Routes
  app.post("/api/applications/apply",auth.loginRequired,uploader.single("file"),ApplicationController.create.applyForReward);
  app.get("/api/applications/:id",auth.loginRequired,ApplicationController.retrieve.getApplication);
  app.post("/api/applications/:id/approve",auth.loginRequired,ApplicationController.approve.approveApplication);
  app.post("/api/applications/:id/reject",auth.loginRequired,ApplicationController.reject.rejectApplication);
  app.put("/api/applications/:id",auth.loginRequired,ApplicationController.delete.updateApplication);
  app.delete("/api/applications/:id",auth.loginRequired,ApplicationController.delete.deleteApplication);


  app.post("/api/crowdfunding/createPost",auth.loginRequired,CrowdfundingController.createPost.createPost);
 
};

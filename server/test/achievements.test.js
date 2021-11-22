const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/app');
chai.use(chaiHttp);
const {signToken} = require('../src/utilities/auth');
const Student = require('../src/models/Student');
const Faculty = require('../src/models/Faculty');
const Application = require('../src/models/Application');

describe("Achievements Test Routes", () => {

  var token="";
  var studentID="";
  var facultyID="";
  const userType="student";
  var achievement={};

// 0. Create Application
// app.post("/api/applications/apply",auth.loginRequired,uploader.single("file"),ApplicationController.create.applyForReward);
  
  beforeEach((done) => {
      Student.create({
          studentID:"181071088",
          name: "test namefdwbfrgr",
          email: "student9@gmail.com",
          password: "12345678",
          department: "Computer Engineering",
          degree: "BTech",
          admissionYear: 2018
      }).then((student) => {


       
          studentID = student._id.toString();
          token = signToken(studentID);
          Faculty.create({
            facultyID:"181071093",
            name: "faculty 1",
            email: "faculty4@gmail.com",
            password: "12345678",
            department: "Computer Engineering",
            position: "BTech",
            description:"HOD"
        }).then((faculty) => {
            facultyID = faculty._id.toString();
        });
        done();
      });
    
  })

   afterEach(( done) => {
      Student.deleteMany().then(()=>{
        Faculty.deleteMany().then(()=>{
            done();
        })
        });
  })

 
   describe("POST /api/applications/apply", () => {
    
//       it("Achievement Submitted successfully for faculty to verify", (done) => {

//         achievement = {
//             studentID: studentID,
//             facultyID: facultyID,
//             title: "CF 1",
//             description: "Achievement Creation",
//         };   
//           chai
//               .request(app)
//               .post("/api/applications/apply")
//               .set('Authorization', `Bearer ${token}`)
//               .send({ ...achievement })
//               .end((err, res) => {
             
//                   expect(err).to.be.null;
//                   expect(res.status).to.be.equal(201);
//                   // expect(res.body).to.be.an("object");
//                   // expect(res.body).to.have.property("product");
//                   done();
//               });
//       });

      it("returns 400 when all details are not given", (done) => {
        const incompleteAchievement = {
            studentID: studentID,
            facultyID: facultyID,
            description: "Achievement Creation",
        };   
          chai
              .request(app)
              .post("/api/applications/apply")
              .set('Authorization', `Bearer ${token}`)
              .send({ ...incompleteAchievement })
              .end((err, res) => {
                 // expect(err).to.be.null;
                  expect(res.status).to.be.equal(400);
                  // expect(res.body).to.be.an("object");
                  // expect(res.body).to.have.property("message").not.equal("");
                  done();
              });
      });
  });

});


// 1. Get Student Applications
// app.get("/api/student/:id/applications",auth.loginRequired,ApplicationController.retrieve.getStudentApplications);
 

describe("Achievements Test Routes 2", () => {

    var token="";
    var studentID="";
    var facultyID="";
    const userType="student";
    var achievement={};
  
    beforeEach((done) => {
        Student.create({
            studentID:"181071084",
            name: "test namefdwbfrgr",
            email: "student5@gmail.com",
            password: "12345678",
            department: "Computer Engineering",
            degree: "BTech",
            admissionYear: 2018
        }).then((student) => {
  
  
         
            studentID = student._id.toString();
            token = signToken(studentID);

          done();
        });
      
    })
  
     afterEach(( done) => {
        Student.deleteMany().then(()=>{
         
              done();
          })
    })
  
   
     describe("POST /api/student/id/applications", () => {

        it("returns 200 to retireve student applications", (done) => {

              chai
                  .request(app)
                  .get("/api/student/"+studentID+"/applications")
                  .set('Authorization', `Bearer ${token}`)
                  .end((err, res) => {
                     // expect(err).to.be.null;
                      expect(res.status).to.be.equal(200);
                      // expect(res.body).to.be.an("object");
                      // expect(res.body).to.have.property("message").not.equal("");
                      done();
                  });
          });
     });
});  


// 3. Get Faculty Applications
//  app.get("/api/faculty/:id/applications",auth.loginRequired,ApplicationController.retrieve.getFacultyApplications);
 
describe("Achievements Test Routes 3", () => {

    var token="";
    var studentID="";
    var facultyID="";
    const userType="student";
    var achievement={};
  
   
    beforeEach((done) => {
        Faculty.create({
              facultyID:"181071093",
              name: "faculty 1",
              email: "faculty4@gmail.com",
              password: "12345678",
              department: "Computer Engineering",
              position: "BTech",
              description:"HOD"
          }).then((faculty) => {
              facultyID = faculty._id.toString();
              token = signToken(facultyID);
              done();
          });
         
    
      
    })
  
     afterEach(( done) => {
      
          Faculty.deleteMany().then(()=>{
              done();
          })
        
    })
     describe("POST /api/faculty/id/applications", () => {

        it("returns 200 to retireve faculty applications", (done) => {

              chai
                  .request(app)
                  .get("/api/faculty/"+facultyID+"/applications")
                  .set('Authorization', `Bearer ${token}`)
                  .end((err, res) => {
                     // expect(err).to.be.null;
                      expect(res.status).to.be.equal(200);
                      // expect(res.body).to.be.an("object");
                      // expect(res.body).to.have.property("message").not.equal("");
                      done();
                  });
          });
     });
});  



// 2. View Application Detail
// app.get("/api/applications/:id",auth.loginRequired,ApplicationController.retrieve.getApplication);


describe("Achievements Test Routes 4", () => {

    var token="";
    var studentID="";
    var facultyID="";
    var applicationID="";
    const userType="student";
    var achievement={};
  
  // 0. Create Application
  // app.post("/api/applications/apply",auth.loginRequired,uploader.single("file"),ApplicationController.create.applyForReward);
    
    beforeEach((done) => {
        Student.create({
            studentID:"181071088",
            name: "test namefdwbfrgr",
            email: "student9@gmail.com",
            password: "12345678",
            department: "Computer Engineering",
            degree: "BTech",
            admissionYear: 2018
        }).then((student) => {   
            studentID = student._id.toString();
            token = signToken(studentID);
            Faculty.create({
              facultyID:"181071093",
              name: "faculty 1",
              email: "faculty4@gmail.com",
              password: "12345678",
              department: "Computer Engineering",
              position: "BTech",
              description:"HOD"
          }).then((faculty) => {
              facultyID = faculty._id.toString();
             Application.create({
            studentID:studentID,
            facultyID: facultyID,
            title: "application 1",
            description:"HOD"
        }).then((application) => {
            applicationID = application._id.toString();
        
          done();
        });
    });
});
})
  
     afterEach(( done) => {
        Student.deleteMany().then(()=>{
          Faculty.deleteMany().then(()=>{
            Application.deleteMany().then(()=>{
                done();
            })
        
          })
          });
    })
  
   
     describe("POST /api/applications/id", () => {
      
        it("returns 200 to fetch all details of an application", (done) => {
         
            chai
                .request(app)
                .get("/api/applications/"+applicationID)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                   // expect(err).to.be.null;
                    expect(res.status).to.be.equal(200);
                    // expect(res.body).to.be.an("object");
                    // expect(res.body).to.have.property("message").not.equal("");
                    done();
                });
        });
    });


    describe("POST /api/applications/id/approve", () => {
      
        it("returns 200 when application is approved", (done) => {
         const applicationToApprove={
facultyID: facultyID,
reward:30
         }

      
            chai
                .request(app)
                .post("/api/applications/"+applicationID+"/approve")
                .set('Authorization', `Bearer ${token}`)
                .send({ ...applicationToApprove })
                .end((err, res) => {
                   // expect(err).to.be.null;
                    expect(res.status).to.be.equal(200);
                    // expect(res.body).to.be.an("object");
                    // expect(res.body).to.have.property("message").not.equal("");
                    done();
                });
        });
    });

    describe("POST /api/applications/id/approve", () => {
      
        it("returns 200 when application ID is wrong", (done) => {
         const applicationToApprove={
facultyID: facultyID,
reward:30
         }

         var invalidApplicationID="dsjcni12243534"
            chai
                .request(app)
                .post("/api/applications/"+invalidApplicationID+"/approve")
                .set('Authorization', `Bearer ${token}`)
                .send({ ...applicationToApprove })
                .end((err, res) => {
                   // expect(err).to.be.null;
                    expect(res.status).to.be.equal(500);
                    // expect(res.body).to.be.an("object");
                    // expect(res.body).to.have.property("message").not.equal("");
                    done();
                });
        });
    });


    describe("POST /api/applications/id/reject", () => {
      
        it("returns 200 when application is rejected", (done) => {
        
            chai
                .request(app)
                .post("/api/applications/"+applicationID+"/reject")
                .set('Authorization', `Bearer ${token}`)
                .send({})
                .end((err, res) => {
                   // expect(err).to.be.null;
                    expect(res.status).to.be.equal(200);
                    // expect(res.body).to.be.an("object");
                    // expect(res.body).to.have.property("message").not.equal("");
                    done();
                });
        });
    });
  
  });
  
  

// 4. Approve application
// app.post("/api/applications/:id/approve",auth.loginRequired,ApplicationController.approve.approveApplication);

// 5. Reject Application
//app.post("/api/applications/:id/reject",auth.loginRequired,ApplicationController.reject.rejectApplication);

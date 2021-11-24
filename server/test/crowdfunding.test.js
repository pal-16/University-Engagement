const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/app');
chai.use(chaiHttp);
const {signToken} = require('../src/utilities/auth');
const Student = require('../src/models/Student');
const Faculty = require('../src/models/Faculty');
const Application = require('../src/models/Application');
const Project = require('../src/models/Project');
const Crowdfunding = require('../src/models/Crowdfunding');

// create post

// view all posts

// donate


describe("Crowdfunding Test Routes", () => {

    var token="";
    var studentID="";
    var postID="";
    const userType="student";
    var achievement={};
  
    
    beforeEach((done) => {
        Student.create({
            studentID:"181071043",
            name: "test namefdwbfrgr",
            email: "Pmantrypalak@gmail.com",
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
        
          });
    })
  
   
     describe("POST /api/crowdfundings/new", () => {
      
  
        it("returns 200 when all details are not given", (done) => {
          const achievement = {
             userID: studentID,
             title: "palak-1",
             amountNeeded: 5,
              description: "Achievement Creation",
          };   
            chai
                .request(app)
                .post("/api/crowdfundings/new")
                .set('Authorization', `Bearer ${token}`)
                .send({ ...achievement })
                .end((err, res) => {
                    expect(res.status).to.be.equal(201);
                 done();
                });
            });
        });
});      
   
                    
describe("Crowdfunding Test Routes", () => {

                        var token="";
                        var studentID="";
                        var postID="";
                        const userType="student";
                        var achievement={};
                      
                        
                        beforeEach((done) => {
                            Student.create({
                                studentID:"181071043",
                                name: "test namefdwbfrgr",
                                email: "Pmantrypalak@gmail.com",
                                password: "12345678",
                                department: "Computer Engineering",
                                degree: "BTech",
                                admissionYear: 2018
                            }).then((student) => {
                      
                                studentID = student._id.toString();
                                token = signToken(studentID);
                            done();
                           
                        })
                    });
                      
                         afterEach(( done) => {
                            Student.deleteMany().then(()=>{
                             
                                  done();
                            
                              });
                        })
                      
    describe("POST /api/crowdfundings/getAll", () => {
      
  
        it("returns 200 when all details are given", (done) => {
        
            chai
                .request(app)
                .get("/api/crowdfundings/getAll")
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                  done();
                });
            });
        });
});

describe("Crowdfunding Test Routes", () => {

        var token="";
        var studentID="";
        var postID="";
        var achievement={};
        beforeEach((done) => {
            Student.create({
                studentID:"181071043",
                name: "test namefdwbfrgr",
                email: "Pmantrypalak@gmail.com",
                password: "12345678",
                department: "Computer Engineering",
                degree: "BTech",
                admissionYear: 2018,
                coins:100
            }).then((student) => {
      
                studentID = student._id.toString();
                token = signToken(studentID);
                Crowdfunding.create({
                    userID:studentID,
                    title: "test namefdwbfrgr",
                    description: "apalk@gmail.com",
                   amountNeeded: 2018
                }).then((c) => {
                    postID=c._id.toString();
              done();
            });
          
        })
    });
      
         afterEach(( done) => {
            Student.deleteMany().then(()=>{
             
                  done();
            
              });
        })
      
    describe("POST /api/crowdfundings/donate", () => {
      
  
        it("returns 200 when all details are given", (done) => {
             achievement = {
                postID: postID,
                senderID: studentID,
                donateAmount: 5,
                receiverID:studentID
             };   
            chai
                .request(app)
                .post("/api/crowdfundings/donate")
                .set('Authorization', `Bearer ${token}`)
                .send({ ...achievement })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    done();
                });
          
            });
        });
});



  
  
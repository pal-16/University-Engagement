const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/app');
chai.use(chaiHttp);
const {signToken} = require('../src/utilities/auth');
const Student = require('../src/models/Student');
describe("Basic test", () => {
  it("gets without error", (done) => {
    chai
      .request(app)
      .get("/api/check")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.equal("Connected");
        done();
      });
  });



});

describe("Crowdfunding Test Routes", () => {

  var token="";
  var userId="";
  const userType="student";
 
var post={};
  beforeEach((done) => {
      Student.create({
          studentID:"181071039",
          name: "test namefdwbfrgr",
          email: "test-emasfgrfhndsgdfhgl@dsc.in",
          password: "12345678",
          department: "Computer Engineering",
          degree: "BTech",
          admissionYear: 2018
      }).then((savedUser) => {
       
          userId = savedUser._id.toString();
          token = signToken(userId);
          done();
          post = {
    
            title: "CF 1",
            description: "MY FIRST POST ROUTE TESTING",
            amountNeeded: 20,
            userID: userId,
            userType: "student"
      
        };   
      });

  

  })

  afterEach((done) => {
      Student.deleteMany().then(() => done());
  });

 
  describe("POST /api/crowdfunding/createPost", () => {
    
      it("creates a crowdfunding post", (done) => {
          chai
              .request(app)
              .post("/api/crowdfunding/createPost")
              .set('Authorization', `Bearer ${token}`)
              .send({ ...post })
              .end((err, res) => {
             
                  expect(err).to.be.null;
                  expect(res.status).to.be.equal(201);
                  // expect(res.body).to.be.an("object");
                  // expect(res.body).to.have.property("product");
                  done();
              });
      });

      it("returns 500 when all details are not given", (done) => {
          const incompleteProduct = {
            title: "CF 1",
            description: "MY FIRST incomplete POST ROUTE TESTING",
            amountNeeded: "dferhr",
            userID: userId,
            userType: "student"
          };
          chai
              .request(app)
              .post("/api/crowdfunding/createPost")
              .set('Authorization', `Bearer ${token}`)
              .send({ ...incompleteProduct })
              .end((err, res) => {
                 // expect(err).to.be.null;
                  expect(res.status).to.be.equal(500);
                  // expect(res.body).to.be.an("object");
                  // expect(res.body).to.have.property("message").not.equal("");
                  done();
              });
      });
  });



  });

const Student = require('./src/models/Student');
const Faculty = require('./src/models/Faculty');
const Application = require('./src/models/Application');
const Project = require('./src/models/Project');
const Transaction = require('./src/models/Transaction');
const Like = require('./src/models/Like');
const Comment = require('./src/models/Comment');
const Crowdfunding = require('./src/models/Crowdfunding');


const app = require('./src/app');

Student.deleteMany().then(()=>{
    console.log("Students Deleted");
});

Crowdfunding.deleteMany().then(()=>{
    console.log("Crowdfunding Deleted");
});
Project.deleteMany().then(()=>{
    console.log("Projects Deleted");
});
Like.deleteMany().then(()=>{
    console.log("Like Deleted");
});
Comment.deleteMany().then(()=>{
    console.log("Comment Deleted");
});

Transaction.deleteMany().then(()=>{
    console.log("Transaction Deleted");
});

Faculty.deleteMany().then(()=>{
    console.log("Faculty Deleted");
});

Application.deleteMany().then(()=>{
    console.log("Application Deleted");
});

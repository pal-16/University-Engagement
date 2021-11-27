const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user:'universityengagement2021@gmail.com', // generated ethereal user
      pass: 'tata2000@P', // generated ethereal password
    },
  });


module.exports=transporter;
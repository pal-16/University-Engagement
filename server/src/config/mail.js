const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user:'mantrypalak@gmail.com', 
      pass: 'mumbai2000@P',
    },
  });


module.exports=transporter;
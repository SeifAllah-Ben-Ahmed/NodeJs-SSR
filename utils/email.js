const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create transporter
  //   const transporter = nodemailer.createTransport({
  //     service: 'Gmail',
  //     auth: {
  //       user: process.env.EMAIL_USERNAME,
  //       pass: process.env.EMAIL_PASSWORD,
  //     },
  // And Activate in gmail "less secure app" option
  //   });
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) Define the email options
  const mailOption = {
    from: 'Seif Allah <seif@mymail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //HTML
  };
  // 3)Actually send the email
  await transporter.sendMail(mailOption);
};

module.exports = sendEmail;

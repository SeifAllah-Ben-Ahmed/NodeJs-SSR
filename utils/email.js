const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Seif Allah <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //SendGrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  //Send the actual email
  async send(template, subject) {
    // Render HTML base on pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      fileName: this.firstName,
      url: this.url,
      subject,
    });
    //Define email options
    const mailOption = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
      //HTML
    };
    // Create a transport and send email
    await this.newTransport().sendMail(mailOption);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the NodeJs Family');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset Token (Valid for only 10 minutes)'
    );
  }
};

// const sendEmail = async (options) => {
//   // 1) Create transporter
//   //   const transporter = nodemailer.createTransport({
//   //     service: 'Gmail',
//   //     auth: {
//   //       user: process.env.EMAIL_USERNAME,
//   //       pass: process.env.EMAIL_PASSWORD,
//   //     },
//   // And Activate in gmail "less secure app" option
//   //   });
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });
//   // 2) Define the email options
//   const mailOption = {
//     from: 'Seif Allah <seif@mymail.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     //HTML
//   };
//   // 3)Actually send the email
//   await transporter.sendMail(mailOption);
// };

// module.exports = sendEmail;

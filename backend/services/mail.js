const nodemailer = require("nodemailer");
var config = require("config");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.get("mail-credentials.userId"),
    pass: config.get("mail-credentials.password"),
  },
});

let sendmail = (toid, sub, text, html) => {
  return transporter.sendMail({
    from: "exam@gmail.com",
    to: toid,
    subject: sub,
    text: text,
    html: html || null,
  });
};

module.exports = { sendmail };

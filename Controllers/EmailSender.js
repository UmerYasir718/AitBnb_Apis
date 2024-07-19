var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "airbnb2926@gmail.com",
    pass: "iekn vqzk cdua liar",
  },
});
function sendBookingEmail(to, subject, body) {
  // Create the mail options
  var mailOptions = {
    from: "airbnb2926@gmail.com", // Replace with your sender email
    to: to,
    subject: subject,
    text: body,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = sendBookingEmail;
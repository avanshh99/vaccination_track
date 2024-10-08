const nodemailer = require('nodemailer');

// Create a transporter for email delivery (Gmail as example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '2022.kshitij.hundre@ves.ac.in',
    pass: 'kshitij2980d',
  },
});

// Function to send confirmation email
function sendConfirmationEmail(userEmail, vaccineType, appointmentDate) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: userEmail,
    subject: 'Vaccination Slot Booking Confirmation',
    text: `Hello, Your booking for the ${vaccineType} vaccine is confirmed on ${appointmentDate}. Please be on time!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

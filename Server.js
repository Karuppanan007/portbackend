// const express = require("express");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Email Configuration
// const transporter = nodemailer.createTransport({
//     service: "gmail", // e.g., 'gmail', 'outlook', etc. or use an SMTP server
//     auth: {
//         user: "karuppusurya007@gmail.com", // Replace with your email
//         pass: "qmau hbrq tfrs jhck", // Replace with your email password or app password
//     },
// });

// // Endpoint to handle form submissions
// app.post("/api/send-email", async (req, res) => {
//     const { name, email, phone, message } = req.body;

//     if (!name || !email || !phone || !message) {
//         return res.status(400).json({ error: "All fields are required." });
//     }

//     const mailOptions = {
//         from: 'karuppusurya007@gmail.com', // The sender's email
//         to: email, // Replace with your email where you want to receive messages
//         subject: `Regarding Contact Form`,
//         text: `Hello  ${name},\n \n

// Thank you for reaching out to me! I have received your message and will get back to you shortly. Here are my contact details:
// \n \n
// Phone: 91+ 7339137389  
// Email: karuppusurya007@gmail.com  \n

// Have a great day!\n

// Best regards,  \n
// Surya`
// }
//   try {
//             await transporter.sendMail(mailOptions);
//             res.status(200).json({ success: "Your email has been sent successfully!" });
//         } catch(error) {
//             console.error("Error sending email:", error);
//             res.status(500).json({ error: "Failed to send email. Please try again later." });
//         }
//     });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://127.0.0.1:${PORT}`);
// });


const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karuppusurya007@gmail.com", // Your email
    pass: "qmau hbrq tfrs jhck", // Your app-specific password
  },
});

// Endpoint to handle form submissions
app.post("/api/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log(req.body);
  

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Email to yourself (admin)
  const mailToAdmin = {
    from: email, // Sender's email
    to: "karuppusurya007@gmail.com", // Your email
    subject: `New Contact Form Submission from ${name}`,
    text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
  };

  // Thank-you email to the user
  const mailToUser = {
    from: "karuppusurya007@gmail.com", // Your email
    to: email, // User's email
    subject: "Thank You for Contacting Me!",
    text: `Hi ${name},\n\nThank you for reaching out to me! I have received your message and will get back to you shortly. Here are my contact details:\n\nPhone: 7339137389\nEmail: karuppusurya007@gmail.com\n\nHave a great day!\n\nBest regards,\nKaruppanan K`,
  };

  try {
    // Send email to admin
    await transporter.sendMail(mailToAdmin);

    // Send thank-you email to user
    await transporter.sendMail(mailToUser);

    res.status(200).json({ success: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Failed to send emails. Please try again later." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});




require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000; // or your preferred port

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Contact form endpoint
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 1. Transporter for ZohoMail
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // ZohoMail
        pass: process.env.EMAIL_PASS, // App password
      },
      tls: {
        rejectUnauthorized: false, // 👈 fixes self-signed cert error
      },
    });


await transporter.sendMail({
  from: `"Savinnah" <contact@savinnah.com>`, // always your Zoho address
  to: "contact@savinnah.com",
  replyTo: email, // so you can hit "Reply" and it goes to the visitor
  subject: `New Contact Form Submission from ${name}`,
  text: `
    You received a new message from your website contact form:
    Name: ${name}
    Email: ${email}
    Message: ${message}
  `,
});


    // 3. Send autoresponse to user
    await transporter.sendMail({
      from: `"Savinnah" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We got your message! 🎉",
      text: `Hey ${name},\n\nThanks for reaching out! I’ve received your message and will get back to you soon.\n\n- Savinnah`,
    });

    console.log(`✅ Email sent successfully to ${email}`);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ message: "Failed to send message", error });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

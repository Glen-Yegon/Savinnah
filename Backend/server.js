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


await transporter.sendMail({
  from: `"Savinnah" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "🎶 Your Message is Jamming in Our Inbox!",
  html: `
  <div style="font-family: Arial, sans-serif; text-align: center; background-color: #000; color: white; padding: 30px;">
    <img src="https://www.savinnah.com/S%20(1).png" alt="Savinnah Logo" style="width: 80px; margin-bottom: 20px;" />
    
<h1 style="color: #fe0077; margin-bottom: 10px;">Hi ${name},</h1>

<p style="font-size:16px; line-height:1.6; max-width:620px; margin:auto;">
Your message has arrived — and I’m genuinely glad to hear from you. 🌟  
</p>

<p style="font-size:16px; line-height:1.6; max-width:620px; margin:20px auto;">
I’ll take a moment to go through it carefully so I can reply with the attention it deserves.  
Think of this as me rolling out a little welcome mat for your ideas. 🏡  
</p>

<p style="font-size:16px; line-height:1.6; max-width:620px; margin:20px auto; text-align:center;">
Warmly, <br>  
<strong>Savinnah</strong>
</p>



    <div style="margin-top: 30px;">
      <a href="https://www.savinnah.com" 
         style="background-color: transparent; border: 2px solid #fe0077; color: white; text-decoration: none; padding: 12px 25px; border-radius: 0px; font-weight: bold;">
         🎶 Visit Savinnah
      </a>
    </div>

    <p style="margin-top: 30px; font-size: 13px; color: #aaa;">
      - Savinnah <br/> Making inboxes musical since forever 🎵
    </p>
  </div>

  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family: Montserrat, Arial, sans-serif; color:#000; max-width:650px;">
  <!-- Top Separator Line -->
  <tr>
    <td colspan="2" style="border-top:2px solid #fe0077; padding:10px 0;"></td>
  </tr>

  <tr>
    <!-- Logo Section -->
    <td width="150" style="padding:10px;">
      <img src="https://www.savinnah.com/S%20(1).png" alt="Savinnah Logo" style="width:140px; height:auto; display:block;">
    </td>

    <!-- Info Section -->
    <td style="padding:10px; vertical-align:middle;">
      <div style="font-size:22px; font-family: Allura, cursive; color:#fe0077; margin-bottom:4px;">
        Savinnah
      </div>
      <div style="font-size:13px; font-family: Montserrat, Arial, sans-serif; color:#333; margin-bottom:10px; line-height:1.5;">
        Music Artist | Songwriter
      </div>

      <!-- Contact -->
      <div style="font-size:13px; color:#000; margin-bottom:6px;">
        📧 <a href="mailto:contact@savinnah.com" style="color:#fe0077; text-decoration:none;">contact@savinnah.com</a>
      </div>
      <div style="font-size:13px; color:#000; margin-bottom:12px;">
        🌐 <a href="https://www.savinnah.com" style="color:#fe0077; text-decoration:none;">www.savinnah.com</a>
      </div>

      <!-- Social Icons -->
      <div>
        <a href="https://www.instagram.com/savinnah?utm_source=ig_web_button_share_sheet&igsh=NzRlbjZqdG9zZG5x" style="margin-right:10px;">
          <img src="https://www.savinnah.com/icons/insta.png" alt="Instagram" style="width:22px; height:22px;">
        </a>
        <a href="https://open.spotify.com/artist/3cd1tAs8P9mpjE4e4kBbQb?si=cjjSG-FvR_eKhLmeJpIzvA" style="margin-right:10px;">
          <img src="https://www.savinnah.com/icons/spotify.png" alt="Spotify" style="width:22px; height:22px;">
        </a>
        <a href="https://music.apple.com/us/artist/savinnah/1693213456" style="margin-right:10px;">
          <img src="https://www.savinnah.com/icons/apple.png" alt="Apple Music" style="width:22px; height:22px;">
        </a>
        <a href="https://www.youtube.com/@savinnah">
          <img src="https://www.savinnah.com/icons/you.png" alt="YouTube" style="width:22px; height:22px;">
        </a>
      </div>
    </td>
  </tr>
</table>

  `,
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

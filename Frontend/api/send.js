import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const { name, email, message } = req.body;

  try {
    // Zoho transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // -------------------------
    // EMAIL TO YOU
    // -------------------------
    await transporter.sendMail({
      from: `"Savinnah" <${process.env.EMAIL_USER}>`,
      to: "contact@savinnah.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
You received a new message from your website contact form:

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    // -------------------------
    // AUTO REPLY
    // -------------------------
    await transporter.sendMail({
      from: `"Savinnah" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎶 Your Message is Jamming in Our Inbox!",
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center; background-color: #000; color: white; padding: 30px;">
        <img src="https://www.savinnah.com/S%20(1).png" alt="Savinnah Logo" style="width: 80px; margin-bottom: 20px;" />
        
        <h1 style="color: #fe0077;">Hi ${name},</h1>

        <p style="font-size:16px; line-height:1.6;">
          Your message has arrived — and I’m genuinely glad to hear from you 🌟
        </p>

        <p style="font-size:16px; line-height:1.6;">
          I’ll go through it carefully and get back to you soon.
        </p>

        <a href="https://www.savinnah.com"
           style="display:inline-block;margin-top:20px;padding:12px 25px;border:2px solid #fe0077;color:white;text-decoration:none;">
           🎶 Visit Savinnah
        </a>

        <p style="margin-top:30px;color:#aaa;font-size:13px;">
          - Savinnah
        </p>
      </div>
      `,
    });

    return res.status(200).json({
      message: "Message sent successfully!",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to send message",
    });
  }
}
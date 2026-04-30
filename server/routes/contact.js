const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// ✅ Reusable transporter — created once, not on every request
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });
  }
  return transporter;
};

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;

    // Basic presence check before hitting DB
    if (!name || !email || !phone || !course || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // STEP 1 — Save to MongoDB Atlas
    const newContact = new Contact({ name, email, phone, course, message });
    await newContact.save();
    console.log(`✅ Contact saved: ${name} <${email}>`);

    // STEP 2 — Send email (non-blocking — DB save already succeeded)
    try {
      if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_EMAIL_PASS) {
        throw new Error("Email credentials not set in .env");
      }

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #1a1a1a; border-radius: 8px; overflow: hidden; color: #ffffff;">
            <div style="background-color: #1e4b7a; padding: 20px; text-align: left;">
              <h2 style="margin: 0; font-size: 20px;">New Contact Form Submission</h2>
              <p style="margin: 5px 0 0; font-size: 14px; color: #a0c4ff;">Received from your educational website</p>
            </div>
            <div style="padding: 20px;">
              <table style="width: 100%; border-collapse: collapse; color: #ffffff;">
                <tr style="border-bottom: 1px solid #333;">
                  <td style="padding: 15px 0; color: #888; width: 30%;">Name</td>
                  <td style="padding: 15px 0;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #333;">
                  <td style="padding: 15px 0; color: #888;">Email</td>
                  <td style="padding: 15px 0; color: #a0c4ff;">${email}</td>
                </tr>
                <tr style="border-bottom: 1px solid #333;">
                  <td style="padding: 15px 0; color: #888;">Phone</td>
                  <td style="padding: 15px 0;">${phone}</td>
                </tr>
                <tr style="border-bottom: 1px solid #333;">
                  <td style="padding: 15px 0; color: #888;">Course</td>
                  <td style="padding: 15px 0; color: #a0c4ff;">${course}</td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; color: #888; vertical-align: top;">Message</td>
                  <td style="padding: 15px 0; line-height: 1.5;">${message}</td>
                </tr>
              </table>
            </div>
            <div style="background: #222; padding: 10px 20px; text-align: center; font-size: 12px; color: #666;">
              Submitted on ${new Date().toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      `;

      await getTransporter().sendMail({
        from: `"DigiEdu Contact Form" <${process.env.ADMIN_EMAIL}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Enquiry from ${name} — ${course}`,
        html: htmlContent,
      });

      console.log(`📧 Email sent to admin for: ${name}`);
    } catch (emailError) {
      console.error("⚠️ Email sending failed (data saved):", emailError.message);
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry submitted successfully!",
    });

  } catch (error) {
    console.error("❌ Contact route error:", error.message);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }

    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "Duplicate submission detected." });
    }

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
});

module.exports = router;
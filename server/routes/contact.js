const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });
  }
  return transporter;
};

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;

    if (!name || !email || !phone || !course || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newContact = new Contact({ name, email, phone, course, message });
    await newContact.save();
    console.log(`✅ Contact saved: ${name} <${email}>`);

    res.status(200).json({ success: true, message: "Enquiry submitted successfully!" });

    try {
      await getTransporter().sendMail({
        from: `"DigiEdu Contact Form" <${process.env.BREVO_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Enquiry from ${name} — ${course}`,
        html: `
          <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
            <div style="max-width:600px; margin:auto; background:#1a1a1a; border-radius:8px; color:#fff;">
              <div style="background:#1e4b7a; padding:20px;">
                <h2 style="margin:0;">New Contact Form Submission</h2>
                <p style="color:#a0c4ff; margin:5px 0 0;">DigiEdu Website</p>
              </div>
              <div style="padding:20px;">
                <table style="width:100%; border-collapse:collapse; color:#fff;">
                  <tr style="border-bottom:1px solid #333;">
                    <td style="padding:12px 0; color:#888; width:30%;">Name</td>
                    <td style="padding:12px 0;">${name}</td>
                  </tr>
                  <tr style="border-bottom:1px solid #333;">
                    <td style="padding:12px 0; color:#888;">Email</td>
                    <td style="padding:12px 0; color:#a0c4ff;">${email}</td>
                  </tr>
                  <tr style="border-bottom:1px solid #333;">
                    <td style="padding:12px 0; color:#888;">Phone</td>
                    <td style="padding:12px 0;">${phone}</td>
                  </tr>
                  <tr style="border-bottom:1px solid #333;">
                    <td style="padding:12px 0; color:#888;">Course</td>
                    <td style="padding:12px 0; color:#a0c4ff;">${course}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0; color:#888; vertical-align:top;">Message</td>
                    <td style="padding:12px 0;">${message}</td>
                  </tr>
                </table>
              </div>
              <div style="background:#222; padding:10px 20px; text-align:center; font-size:12px; color:#666;">
                Submitted on ${new Date().toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        `,
      });
      console.log(`📧 Email sent to admin for: ${name}`);
    } catch (emailError) {
      console.error("⚠️ Email failed (data saved):", emailError.message);
    }

  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

module.exports = router;
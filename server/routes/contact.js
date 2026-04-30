const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
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

    if (!name || !email || !phone || !course || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newContact = new Contact({ name, email, phone, course, message });
    await newContact.save();
    console.log(`✅ Contact saved: ${name} <${email}>`);

    res.status(200).json({ success: true, message: "Enquiry submitted successfully!" });

    try {
      await getTransporter().sendMail({
        from: `"DigiEdu Contact Form" <${process.env.ADMIN_EMAIL}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Enquiry from ${name} — ${course}`,
        html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Course:</b> ${course}</p><p><b>Message:</b> ${message}</p>`,
      });
      console.log(`📧 Email sent for: ${name}`);
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

const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const https = require("https");

// Send email via Brevo HTTP API (port 443 — never blocked by Render)
const sendEmailViaBrevo = (name, email, phone, course, message) => {
  return new Promise((resolve, reject) => {
    const emailData = JSON.stringify({
      sender: { name: "DigiEdu Contact Form", email: "alonesurvivor03@gmail.com" },
      to: [{ email: "alonesurvivor03@gmail.com", name: "Anuj Singh" }],
      subject: `New Enquiry from ${name} — ${course}`,
      htmlContent: `
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
      `
    });

    const options = {
      hostname: "api.brevo.com",
      path: "/v3/smtp/email",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "Content-Length": Buffer.byteLength(emailData)
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        if (res.statusCode === 201) {
          resolve(data);
        } else {
          reject(new Error(`Brevo API error: ${res.statusCode} — ${data}`));
        }
      });
    });

    req.on("error", reject);
    req.write(emailData);
    req.end();
  });
};

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;

    if (!name || !email || !phone || !course || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, phone, course, message });
    await newContact.save();
    console.log(`✅ Contact saved: ${name} <${email}>`);

    // Return success immediately
    res.status(200).json({ success: true, message: "Enquiry submitted successfully!" });

    // Send email via Brevo HTTP API after response
    try {
      await sendEmailViaBrevo(name, email, phone, course, message);
      console.log(`📧 Email sent via Brevo API for: ${name}`);
    } catch (emailError) {
      console.error("⚠️ Brevo API email failed:", emailError.message);
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
const router = require('express').Router();
const Lead = require('../models/Lead');
const transporter = require('../config/mailer');

router.post('/contact', async (req, res) => {
  const { name, email, phone, course, message } = req.body;

  // Basic validation
  if (!name || !email || !phone || !course) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide all required fields: name, email, phone, and course.' 
    });
  }

  try {
    // Run MongoDB save and Email sending in parallel
    const results = await Promise.allSettled([
      // ACTION 1: Save to MongoDB
      (async () => {
        const newLead = new Lead({ name, email, phone, course, message });
        return await newLead.save();
      })(),

      // ACTION 2: Send email to admin
      transporter.sendMail({
        from: `"Digi-Learners Bot" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Enquiry: ${course} from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #2ECC71; color: white; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">New Student Enquiry</h2>
              <p style="margin: 5px 0 0;">Digi-Learners Ed-Tech</p>
            </div>
            <div style="padding: 20px; line-height: 1.6; color: #333;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Name:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Course:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${course}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Message:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${message || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Submitted At:</td>
                  <td style="padding: 10px;">${new Date().toLocaleString('en-IN')}</td>
                </tr>
              </table>
            </div>
            <div style="background-color: #f8f9fa; color: #777; padding: 15px; text-align: center; font-size: 12px;">
              This is an automated enquiry from your website Digi-Learners.
            </div>
          </div>
        `
      })
    ]);

    // Check if at least the database save was successful
    const dbResult = results[0];
    const emailResult = results[1];

    if (dbResult.status === 'rejected') {
      console.error('Database Error:', dbResult.reason);
      throw new Error('Failed to save enquiry to database');
    }

    if (emailResult.status === 'rejected') {
      console.warn('Email Warning:', emailResult.reason);
      // We still return success if DB save worked, but maybe log the email failure
    }

    res.json({ 
      success: true, 
      message: 'Enquiry submitted successfully! Our team will contact you soon.' 
    });

  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Please try again later.' 
    });
  }
});

module.exports = router;

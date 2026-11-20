import nodemailer from "nodemailer";
import crypto from "crypto";
import OtpSendToDatabase from "../models/otp.modals.js";

export const OtpSend = async (req, res) => {
  try {
    const { email, name } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "ইমেইল পাওয়া যায়নি।" });
    }
    const otp = crypto.randomInt(100000, 1000000).toString();
    await OtpSendToDatabase.updateOne(
      { email },
      { $set: { email, name, otp, createdAt: new Date() } },
      { upsert: true },
    );

    console.log(`OTP Send to the Database for Email: ${email} and OTP ${otp}`);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const otpSending = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🔐 Your Health Community Verification Code",
      html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 30px; margin: 0;">
              <div style="max-width: 500px; background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin: 0 auto; text-align: center;">
                
                <!-- Logo or Header Title -->
                <h2 style="color: #059669; margin-bottom: 10px; font-size: 24px;">Health Community</h2>
                <p style="color: #6b7280; font-size: 14px; margin-top: 0;">Secure Account Verification</p>
                
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />

                <!-- Greeting -->
                <p style="color: #374151; font-size: 16px; text-align: left; margin-bottom: 15px;">
                  Hello <strong>${name}</strong>,
                </p>
                
                <p style="color: #374151; font-size: 15px; text-align: left; line-height: 1.5; margin-bottom: 25px;">
                  Thank you for registering with Health Community! To complete your registration, please use the following One-Time Password (OTP):
                </p>

                <!-- OTP Box Container -->
                <div style="background-color: #ecfdf5; border: 2px dashed #10b981; border-radius: 8px; padding: 15px; margin: 25px 0; text-align: center;">
                  <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #047857;">
                    ${otp}
                  </span>
                </div>

                <p style="color: #ef4444; font-size: 13px; margin-bottom: 25px;">
                  ⏱ Note: This OTP is valid for <strong>5 minutes</strong> only. Do not share it with anyone.
                </p>

                <p style="color: #9ca3af; font-size: 12px; text-align: left; line-height: 1.4; border-top: 1px solid #f3f4f6; pt: 20px; margin-top: 30px;">
                  If you didn't request this code, you can safely ignore this email. 
                </p>

                <!-- Footer -->
                <p style="color: #6b7280; font-size: 13px; margin-top: 20px; margin-bottom: 0;">
                  Best Regards,<br/>
                  <strong style="color: #374151;">Health Community Team</strong>
                </p>
              </div>
            </div>
          `,
    };
    await transporter.sendMail(otpSending);

    res.status(200).json({ success: true, message: "ওটিপি পাঠানো হয়েছে।" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "সার্ভার এরর।" });
  }
};

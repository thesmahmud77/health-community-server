import otpDatabase from "../models/otp.modals.js";

export const OtpGet = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "ইমেইল পাওয়া যায়নি।" });
    }
    console.log("Email From Client", email);
    const record = await otpDatabase.findOne({ email });
    // console.log("OTP Found:", record.message);

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "ওটিপির মেয়াদ শেষ হয়ে গেছে, আবার চেষ্টা করুন।",
      });
    }
    const deleteOtp = await otpDatabase.deleteOne({ email });
    res.status(200).json({
      success: true,
      serverOtp: record.otp,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "সার্ভার এরর।" });
  }
};

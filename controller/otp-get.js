export const OtpGet = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "ইমেইল পাওয়া যায়নি।" });
    }
    const record = await OtpCollectionDB.findOne({ email });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "ওটিপির মেয়াদ শেষ হয়ে গেছে, আবার চেষ্টা করুন।",
      });
    }

    res.status(200).json({
      success: true,
      serverOtp: record.otp,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "সার্ভার এরর।" });
  }
};

import testDatabse from "../../models/Test/test.modal.js";

// MongoDB (testcollections) থেকে সব টেস্ট আনার ফাংশন
export const getAllTests = async (req, res) => {
  try {
    const tests = await testDatabse.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ success: true, testdata: tests.length, tests });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "টেস্ট ডেটা আনতে সমস্যা হয়েছে",
    });
  }
};

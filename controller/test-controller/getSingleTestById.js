import testDatabse from "../../models/Test/test.modal.js";

export const getSingleTestById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format first
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Test ID format",
      });
    }

    const test = await testDatabse.findById(id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: test,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while fetching test",
    });
  }
};

import testDatabse from "../../models/Test/test.modal.js";

export const createTest = async (req, res) => {
  try {
    const newTest = await testDatabse.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Test created successfully",
      data: newTest,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create test",
    });
  }
};

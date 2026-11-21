import categoriesDatabase from "../../models/categories/categories.modal.js";

export const getAllCategories = async (req, res) => {
  try {
    const allCategoris = await categoriesDatabase.find();
    console.log(allCategoris);
    res
      .status(200)
      .json(allCategoris)
      .send({ success: true, message: "Categoris Data Found Successfully" });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Categoris Data not Found",
      error,
    });
  }
};

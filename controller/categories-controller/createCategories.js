import categoriesDatabase from "../../models/categories/categories.modal.js";

export const createCategories = async (req, res) => {
  try {
    const data = req.body;
    const sendingCategorisCollection = await categoriesDatabase.create(data);
    console.log(sendingCategorisCollection);

    res
      .status(200)
      .send({ success: true, message: "Categoris Create Successfully" });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Categoris Create Unsuccessful",
      error,
    });
  }
};
